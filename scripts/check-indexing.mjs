// The docs are open to search engines, except the tester section:
// - every page outside /testers/ is indexable (no robots noindex meta);
// - every /testers/ page carries a robots noindex meta;
// - robots.txt doesn't block the site, and points at the sitemap;
// - the sitemap exists and leaves out /testers/.
import { readFileSync, existsSync } from 'node:fs';
import { sep } from 'node:path';
import { walk, report } from './lib.mjs';

const failures = [];
const NOINDEX = /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/;
const TESTERS = `dist${sep}testers${sep}`;

for (const file of walk('dist', ['.html'])) {
  const html = readFileSync(file, 'utf8');
  const tester = file.startsWith(TESTERS);
  if (tester && !NOINDEX.test(html)) failures.push(`${file}: tester page without a robots noindex meta`);
  // 404.html may say noindex; any other page must not.
  if (!tester && file !== `dist${sep}404.html` && NOINDEX.test(html)) failures.push(`${file}: has a robots noindex meta`);
}
if (!existsSync('dist/robots.txt')) {
  failures.push('dist/robots.txt missing');
} else {
  const robots = readFileSync('dist/robots.txt', 'utf8');
  if (/^Disallow: \/\s*$/m.test(robots)) failures.push('dist/robots.txt blocks the whole site ("Disallow: /")');
  if (!/^Sitemap: https:\/\/docs\.telekin\.ai\/sitemap-index\.xml\s*$/m.test(robots)) failures.push('dist/robots.txt has no Sitemap line');
}
if (!existsSync('dist/sitemap-index.xml')) failures.push('dist/sitemap-index.xml missing');
const sitemaps = existsSync('dist') ? walk('dist', ['.xml']).filter((f) => /sitemap-\d+\.xml$/.test(f)) : [];
if (!sitemaps.length) failures.push('no dist/sitemap-N.xml');
for (const f of sitemaps) if (readFileSync(f, 'utf8').includes('/testers/')) failures.push(`${f}: lists a /testers/ page`);
report('indexing', failures);
