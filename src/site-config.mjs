// The one place to change the site URL, the waitlist and feedback links, and the form ids.
// The founder sets the real values at deploy time (see Task 19).
export const SITE_URL = 'https://docs.telekin.ai';
export const WAITLIST_URL = '/waitlist/';
// Where "ask us" links go. Change this when there is a support address.
export const CONTACT_URL = 'mailto:hello@hypotheosis.ai';
// Where "send feedback" links go (the docs sidebar, and the console's
// feedback_url setting points here too).
export const FEEDBACK_URL = '/feedback/';
// Forminit form ids. Each form is its own Forminit form with its own inbox;
// the waitlist and feedback never share one.
export const WAITLIST_FORM_ID = 'r31ac40c2ux';
// The feedback form needs Forminit's Pro plan (the free plan allows one form).
// If this is ever emptied, the feedback page asks people to email CONTACT_URL.
export const FEEDBACK_FORM_ID = '3ic9pigxmcr';
