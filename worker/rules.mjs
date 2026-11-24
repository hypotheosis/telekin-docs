// The Worker's decisions, kept apart from the Workers runtime so they can be
// unit-tested in Node.

// Where analytics waits for the visitor's consent: the EU, the rest of the
// EEA (Iceland, Liechtenstein, Norway), the UK and Switzerland. ISO 3166-1
// alpha-2, as Cloudflare reports them in request.cf.country.
export const CONSENT_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  'IS', 'LI', 'NO',
  'GB', 'CH',
]);

// Cloudflare's codes that aren't a country: XX (unknown) and T1 (Tor).
const NOT_A_COUNTRY = new Set(['XX', 'T1']);

/**
 * 'implied' when the visitor's country doesn't require asking first,
 * otherwise 'required'. No country, or one Cloudflare can't place (XX, T1,
 * no request.cf in a local preview), asks first.
 */
export function consentFor(country) {
  if (typeof country !== 'string' || !/^[A-Z][A-Z0-9]$/.test(country) || NOT_A_COUNTRY.has(country)) return 'required';
  return CONSENT_COUNTRIES.has(country) ? 'required' : 'implied';
}

/**
 * HeyCatch short links: a one-character path (/a to /z, /0 to /9, with or
 * without a trailing slash) redirects to the home page with its campaign
 * tags. Returns the redirect's path and query, or null for any other path.
 * The docs have no real one-character pages.
 */
export function shortLinkTarget(pathname) {
  const m = /^\/([a-z0-9])\/?$/.exec(pathname);
  return m ? `/?utm_source=heycatch&utm_campaign=${m[1]}` : null;
}
