import test from 'node:test';
import assert from 'node:assert/strict';
import { consentFor, shortLinkTarget, CONSENT_COUNTRIES } from './rules.mjs';

test('EU, EEA, UK and Swiss visitors are asked first', () => {
  for (const c of ['DE', 'FR', 'IE', 'NO', 'IS', 'LI', 'GB', 'CH']) assert.equal(consentFor(c), 'required', c);
  assert.equal(CONSENT_COUNTRIES.size, 32);
});
test('visitors elsewhere are counted unless they opt out', () => {
  for (const c of ['US', 'CA', 'AU', 'IN', 'BR', 'JP']) assert.equal(consentFor(c), 'implied', c);
});
test('an unknown country asks first', () => {
  for (const c of [undefined, null, '', 'XX1', 'de', 'XX', 'T1']) assert.equal(consentFor(c), 'required', String(c));
});
test('one-character paths are short links', () => {
  assert.equal(shortLinkTarget('/a'), '/?utm_source=heycatch&utm_campaign=a');
  assert.equal(shortLinkTarget('/7/'), '/?utm_source=heycatch&utm_campaign=7');
});
test('other paths are not', () => {
  for (const p of ['/', '/ab', '/A', '/vs/', '/a/b', '/pricing/', '/-']) assert.equal(shortLinkTarget(p), null, p);
});
