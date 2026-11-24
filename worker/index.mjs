// Runs in front of the static site (dist/, served through the ASSETS binding).
// Two jobs:
// - HeyCatch short links (/a … /z, /0 … /9) redirect, 302, to the home page
//   with their campaign tags;
// - every HTML page gets <html data-consent="required|implied"> from the
//   visitor's country, so the analytics script knows whether to wait for the
//   consent banner (see src/components/Analytics.astro).
// Old-URL redirects stay in public/_redirects.
import { consentFor, shortLinkTarget } from './rules.mjs';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const target = shortLinkTarget(url.pathname);
    if (target) return Response.redirect(new URL(target, url).href, 302);

    const response = await env.ASSETS.fetch(request);
    if (!(response.headers.get('content-type') || '').includes('text/html')) return response;

    const consent = consentFor(request.cf?.country);
    const page = new HTMLRewriter()
      .on('html', { element(el) { el.setAttribute('data-consent', consent); } })
      .transform(response);
    // The page now differs by country: don't let a shared cache hand one
    // country's copy to another.
    const headers = new Headers(page.headers);
    headers.set('Cache-Control', 'private, no-cache');
    return new Response(page.body, { status: page.status, statusText: page.statusText, headers });
  },
};
