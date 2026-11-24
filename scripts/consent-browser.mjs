// Browser test of the analytics consent flow, with the real bundled SDK, in
// headless Chrome over the DevTools protocol (no extra dependencies).
//
//   npm run build && npx astro preview --port 4321 &
//   npm run check:consent            # or: node scripts/consent-browser.mjs http://localhost:4321
//
// Needs Chrome (CHROME=/path/to/chrome to choose one), so it isn't part of the
// Workers Builds check. Requests to HeyCatch are intercepted and answered
// locally: nothing reaches HeyCatch. The Worker's <html data-consent> is
// simulated by rewriting each page as it loads. The SDK ignores headless
// browsers as bots, so the test browser presents an ordinary Chrome user
// agent and hides navigator.webdriver; that's safe because none of its requests leave the machine.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BASE = (process.argv[2] || 'http://localhost:4321').replace(/\/$/, '');
const CHROME = process.env.CHROME || 'google-chrome';
const OURS = 'telekin-analytics';
// Starlight's light/dark choice: the site's own, not analytics.
const SITE_KEYS = [OURS, 'starlight-theme'];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'consent-chrome-'));
  const proc = spawn(CHROME, ['--headless=new', '--no-sandbox', '--no-first-run', `--user-data-dir=${profile}`,
    '--remote-debugging-port=0', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  const wsUrl = await new Promise((resolve, reject) => {
    let err = '';
    proc.stderr.on('data', (d) => { err += d; const m = /DevTools listening on (ws:\/\/\S+)/.exec(err); if (m) resolve(m[1]); });
    proc.on('exit', () => reject(new Error(`Chrome exited: ${err.slice(-500)}`)));
  });
  const port = new URL(wsUrl).port;
  const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const ws = new WebSocket(pages.find((p) => p.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let id = 0;
  const pending = new Map();
  const listeners = [];
  ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method) listeners.forEach((l) => l(msg));
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const n = ++id; pending.set(n, { resolve, reject }); ws.send(JSON.stringify({ id: n, method, params }));
  });
  const close = () => { ws.close(); proc.kill(); setTimeout(() => rmSync(profile, { recursive: true, force: true }), 500); };
  return { send, on: (l) => listeners.push(l), close };
}

/** One fresh browser: consent mode set on every page, optional GPC; records HeyCatch requests. */
async function browser({ consent, gpc = false }) {
  const b = await launch();
  const hits = []; // { method, url } of every request to HeyCatch
  b.on(async (msg) => {
    if (msg.method !== 'Fetch.requestPaused') return;
    const p = msg.params;
    try {
      if (/heycatch\.ai/.test(p.request.url)) {
        hits.push({ method: p.request.method, url: p.request.url });
        const js = /\.js(\?|$)/.test(p.request.url);
        await b.send('Fetch.fulfillRequest', { requestId: p.requestId, responseCode: 200,
          responseHeaders: [{ name: 'Content-Type', value: js ? 'text/javascript' : 'application/json' }, { name: 'Access-Control-Allow-Origin', value: '*' },
            { name: 'Access-Control-Allow-Headers', value: '*' }, { name: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' }],
          body: Buffer.from(js ? '' : '{}').toString('base64') });
      } else if (p.responseStatusCode !== undefined && p.resourceType === 'Document') {
        const { body, base64Encoded } = await b.send('Fetch.getResponseBody', { requestId: p.requestId });
        const html = (base64Encoded ? Buffer.from(body, 'base64').toString('utf8') : body).replace('<html lang="en"', `<html lang="en" data-consent="${consent}"`);
        await b.send('Fetch.fulfillRequest', { requestId: p.requestId, responseCode: p.responseStatusCode,
          responseHeaders: p.responseHeaders.filter((h) => !/content-length|content-encoding/i.test(h.name)), body: Buffer.from(html).toString('base64') });
      } else {
        await b.send('Fetch.continueRequest', { requestId: p.requestId });
      }
    } catch { /* the page navigated away */ }
  });
  await b.send('Fetch.enable', { patterns: [{ urlPattern: '*heycatch.ai*', requestStage: 'Request' }, { resourceType: 'Document', requestStage: 'Response' }] });
  await b.send('Page.enable');
  const { userAgent } = await b.send('Browser.getVersion');
  await b.send('Emulation.setUserAgentOverride', { userAgent: userAgent.replace('HeadlessChrome', 'Chrome') });
  await b.send('Page.addScriptToEvaluateOnNewDocument', { source: "Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false });" });
  await b.send('Network.enable');
  if (gpc) await b.send('Page.addScriptToEvaluateOnNewDocument', { source: "Object.defineProperty(Navigator.prototype, 'globalPrivacyControl', { get: () => true });" });
  const evaluate = async (expression) => (await b.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
  const loaded = () => new Promise((r) => b.on((m) => { if (m.method === 'Page.loadEventFired') r(); }));
  return {
    hits,
    async go(path) { const l = loaded(); await b.send('Page.navigate', { url: BASE + path }); await l; await sleep(2500); },
    evaluate,
    async click(selector) { await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`); await sleep(2500); },
    bannerShown: () => evaluate(`!document.querySelector('[data-consent-banner]').hidden`),
    /**
     * Analytics storage: cookies for this site, and localStorage keys other
     * than the site's own (SITE_KEYS). With { refusal: true }, the SDK's own record of a
     * refusal (__ph_opt_in_out_*, which holds no ID) is allowed too.
     */
    async storage({ refusal = false } = {}) {
      const { cookies } = await b.send('Network.getCookies', { urls: [BASE] });
      const keys = (await evaluate(`Object.keys(localStorage).filter((k) => !${JSON.stringify(SITE_KEYS)}.includes(k))`))
        .filter((k) => !(refusal && k.startsWith('__ph_opt_in_out_')));
      return [...cookies.map((c) => `cookie ${c.name}`), ...keys.map((k) => `localStorage ${k}`)];
    },
    saved: () => evaluate(`localStorage.getItem('${OURS}')`),
    close: b.close,
  };
}

const captures = (hits, from = 0) => hits.slice(from).filter((h) => h.method === 'POST');
const results = [];
async function scenario(name, fn) {
  try { await fn(); results.push(`ok   ${name}`); } catch (e) { results.push(`FAIL ${name}: ${e.message}`); }
}
function expect(cond, msg) { if (!cond) throw new Error(msg); }

await scenario('required: nothing sent or stored before Accept; Accept starts capture; Decline stops it', async () => {
  const br = await browser({ consent: 'required' });
  try {
    await br.go('/');
    expect(await br.bannerShown(), 'banner not shown');
    expect(br.hits.length === 0, `requests to HeyCatch before Accept: ${JSON.stringify(br.hits)}`);
    const before = await br.storage();
    expect(before.length === 0, `stored before Accept: ${before.join(', ')}`);
    await br.click('[data-consent-choice="yes"]');
    expect(!(await br.bannerShown()), 'banner still shown after Accept');
    expect((await br.saved()) === 'yes', 'answer not saved');
    expect(captures(br.hits).length > 0, 'nothing captured after Accept');
    let n = br.hits.length;
    await br.go('/faq/');
    expect(!(await br.bannerShown()), 'banner shown again after Accept');
    expect(captures(br.hits, n).length > 0, 'nothing captured on the next page after Accept');
    await br.click('a[data-consent-open]');
    expect(await br.bannerShown(), '"Analytics choices" did not reopen the banner');
    await br.click('[data-consent-choice="no"]');
    expect((await br.saved()) === 'no', 'Decline not saved');
    n = br.hits.length;
    await br.go('/start/');
    expect(captures(br.hits, n).length === 0, `captured after Decline: ${JSON.stringify(captures(br.hits, n))}`);
  } finally { br.close(); }
});

await scenario('required: Decline first means nothing sent or stored, then or on the next page', async () => {
  const br = await browser({ consent: 'required' });
  try {
    await br.go('/');
    await br.click('[data-consent-choice="no"]');
    await br.go('/faq/');
    expect(!(await br.bannerShown()), 'banner shown again after Decline');
    expect(captures(br.hits).length === 0, 'captured after Decline');
    const s = await br.storage({ refusal: true });
    expect(s.length === 0, `stored after Decline: ${s.join(', ')}`);
  } finally { br.close(); }
});

await scenario('implied: no banner, captured', async () => {
  const br = await browser({ consent: 'implied' });
  try {
    await br.go('/');
    expect(!(await br.bannerShown()), 'banner shown');
    expect(captures(br.hits).length > 0, 'nothing captured');
  } finally { br.close(); }
});

await scenario('GPC: nothing sent or stored, even after a saved Accept, in either mode', async () => {
  for (const consent of ['required', 'implied']) {
    const br = await browser({ consent, gpc: true });
    try {
      await br.go('/');
      expect(!(await br.bannerShown()), `${consent}: banner shown`);
      await br.evaluate(`localStorage.setItem('${OURS}', 'yes')`);
      await br.go('/faq/');
      expect(br.hits.length === 0, `${consent}: requests to HeyCatch with GPC: ${JSON.stringify(br.hits)}`);
      const s = await br.storage();
      expect(s.length === 0, `${consent}: stored with GPC: ${s.join(', ')}`);
    } finally { br.close(); }
  }
});

console.log(results.join('\n'));
process.exit(results.some((r) => r.startsWith('FAIL')) ? 1 : 0);
