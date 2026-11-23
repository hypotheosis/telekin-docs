// The one place to change the site URL, the feedback link, and the form ids.
// The founder sets the real values at deploy time (see Task 19).
export const SITE_URL = 'https://docs.telekin.ai';
// Where "ask us" links go. Change this when there is a support address.
export const CONTACT_URL = 'mailto:hello@hypotheosis.ai';
// Where "send feedback" links go (the docs sidebar, and the console's
// feedback_url setting points here too).
export const FEEDBACK_URL = '/feedback/';
// Forminit form ids. Each form is its own Forminit form with its own inbox.
// The feedback form needs Forminit's Pro plan (the free plan allows one form).
// If this is ever emptied, the feedback page asks people to email CONTACT_URL.
export const FEEDBACK_FORM_ID = '3ic9pigxmcr';
