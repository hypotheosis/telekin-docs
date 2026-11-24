// The analytics consent decision, kept apart from the page so it can be
// unit-tested. Used by src/components/Analytics.astro (copied from the telekin-site repo).
//
// answer:    the visitor's saved choice, 'yes' or 'no'; anything else means
//            they haven't answered.
// mustAsk:   the visitor's country requires asking first (the Worker's
//            data-consent="required", or no country at all).
// signalsNo: the browser sends Global Privacy Control or Do Not Track.
//            This wins over everything, including a saved 'yes'.

const saved = (answer) => (answer === 'yes' || answer === 'no' ? answer : null);

/** Whether HeyCatch may capture (and store its visitor ID) on this page. */
export function analyticsAllowed({ answer, mustAsk, signalsNo }) {
  if (signalsNo) return false;
  const a = saved(answer);
  if (a) return a === 'yes';
  return !mustAsk;
}

/** Whether the banner opens by itself on this page. */
export function bannerOpensOnLoad({ answer, mustAsk, signalsNo }) {
  return mustAsk && !signalsNo && saved(answer) === null;
}
