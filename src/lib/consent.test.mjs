import test from 'node:test';
import assert from 'node:assert/strict';
import { analyticsAllowed, bannerOpensOnLoad } from './consent.mjs';

const cases = (over) => ({ answer: null, mustAsk: true, signalsNo: false, ...over });

test('where consent is required, nothing is allowed until the visitor accepts', () => {
  assert.equal(analyticsAllowed(cases({})), false);
  assert.equal(bannerOpensOnLoad(cases({})), true);
  assert.equal(analyticsAllowed(cases({ answer: 'yes' })), true);
  assert.equal(bannerOpensOnLoad(cases({ answer: 'yes' })), false);
  assert.equal(analyticsAllowed(cases({ answer: 'no' })), false);
  assert.equal(bannerOpensOnLoad(cases({ answer: 'no' })), false);
});
test('elsewhere, analytics is on until the visitor declines, with no banner', () => {
  assert.equal(analyticsAllowed(cases({ mustAsk: false })), true);
  assert.equal(analyticsAllowed(cases({ mustAsk: false, answer: 'no' })), false);
  assert.equal(analyticsAllowed(cases({ mustAsk: false, answer: 'yes' })), true);
  for (const answer of [null, 'yes', 'no']) assert.equal(bannerOpensOnLoad(cases({ mustAsk: false, answer })), false);
});
test('GPC or Do Not Track turns analytics off everywhere, even after Accept', () => {
  for (const mustAsk of [true, false]) {
    for (const answer of [null, 'yes', 'no']) {
      assert.equal(analyticsAllowed(cases({ mustAsk, answer, signalsNo: true })), false, `${mustAsk} ${answer}`);
      assert.equal(bannerOpensOnLoad(cases({ mustAsk, answer, signalsNo: true })), false, `${mustAsk} ${answer}`);
    }
  }
});
test('an unreadable or odd saved answer counts as no answer', () => {
  for (const answer of [undefined, '', 'YES', 'true']) {
    assert.equal(analyticsAllowed(cases({ answer })), false);
    assert.equal(bannerOpensOnLoad(cases({ answer })), true);
    assert.equal(analyticsAllowed(cases({ answer, mustAsk: false })), true);
  }
});
