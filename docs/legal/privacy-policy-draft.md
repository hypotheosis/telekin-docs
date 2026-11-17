# Telekin privacy policy (DRAFT)

> **Draft, 2026-11-17. Not published.** This file is in the repository's
> `docs/` folder, not in `src/content/`, so the docs site doesn't serve
> it. The founder confirmed every open fact and choice on 2026-11-17.
> "Reviewer notes" at the end lists what must be true before it goes live,
> and the questions for a lawyer if it gets a review. When it's
> published, it replaces the waitlist-only page on telekin.ai
> (`telekin-site/src/pages/privacy.astro`), and the docs page "Your data"
> links to it.

**Last updated:** [date of publication]

Telekin is a long-term memory for your AI apps. It is run by Hypotheosis
LLC, a Delaware limited liability company, 78 Glocker Way Suite #264,
Pottstown, PA 19465 ("we", "us"). This policy explains what we collect when you use Telekin, why, who
we share it with, how long we keep it, and what you can ask us to do with
it.

Questions or requests: privacy@telekin.ai.

## The short version

- Your memory (your catalogs and their notes) is yours. We store it so
  your AI apps can read and write it. We don't sell it, we don't use it
  for advertising, and we don't use it to train AI models.
- Telekin staff can't open your memory without deliberately unlocking it
  and giving a reason. Every unlock is recorded in an audit log that you
  can see.
- Card details go to Stripe, our payment processor. We never see them.
- If your subscription ends, we keep your data for 30 days so you can
  download it or come back. Then we delete it.

## What we collect

### Your account

- Your email address, and a display name if you give one.
- How you sign in: a password (stored only as a one-way hash), passkeys,
  and any sign-in links or codes we email you.
- The teams you belong to and your role in each.

### Your memory

- The catalogs you or your AI apps create, and everything in them: notes,
  their history, drafts, and any sources or files you add.
- The record of each change: who or what made it (you, a key, or an
  app), and when.

What goes into your memory is up to you and your AI apps. Please don't
store passwords, secret keys or other credentials. Telekin refuses some
of them, but it can't recognise every kind.

### Connections and activity

- The apps you've approved (sign-in grants) and the keys you've made,
  with when each was created and last used.
- For signed-in web sessions: when each started and was last used, your
  IP address and your browser's user-agent string. You can see these in
  your console.
- An audit log of actions on your account, teams and catalogs, such as
  sign-ins, changes to keys and grants, membership changes, deletions,
  and staff unlocks. It includes the IP address of web requests.
- Operational logs, traces and error reports, which we use to keep the
  service running. They identify accounts and records only by internal
  random IDs. They contain no names, email addresses or memory content.

### Billing

- When you subscribe, Stripe collects your email, card and billing
  address through its checkout page. We receive your Stripe customer ID,
  your subscription's ID, plan and status, and the email Stripe holds.
  We never receive your full card number.
- We keep a record of each team's billing state: its plan, its status,
  when it was suspended and when it is due for deletion.

### The waitlist and our websites

- When you join the waitlist, we collect your email address, the page you
  signed up from, and any campaign tags in the link you followed. The
  site's [existing privacy page](https://telekin.ai/privacy/) covers this
  in detail.

### Cookies and analytics

- **Our public websites** use Google Analytics to understand how visitors
  find and use them. Google Analytics sets cookies and receives your IP
  address, browser details and the pages you visit. Where the law
  requires your consent (for example in the EU and the UK), we ask before
  setting these cookies. You can also block them in your browser, or with
  Google's opt-out add-on.
- **The Telekin console** uses cookies only to keep you signed in and to
  protect forms against forgery. They're necessary for the console to
  work. The console runs no analytics.
- **Payments:** when you subscribe or manage billing, you're sent to
  Stripe's own pages. Stripe sets its own cookies there, for example to
  prevent fraud, under [Stripe's privacy policy](https://stripe.com/privacy)
  and cookie policy. We don't control them.

## Why we use it

- **To provide Telekin:** to store your memory and serve it to the apps
  and keys you've approved, sign you in, run teams, and send the emails
  the service needs (setup links, sign-in links, billing links, and
  notices about your subscription and your data).
- **To bill you:** through Stripe, including trials, renewals and failed
  payments.
- **To keep it secure and working:** to detect abuse, investigate
  problems, and keep the audit trail.
- **To meet legal obligations:** for example tax and accounting records.
- **We don't send marketing email.** The only emails we send are the ones
  the service needs. If that ever changes, we'll ask first, and every such
  email will have an unsubscribe link.

We don't sell your personal information. We don't use your memory for
advertising, and we don't use it to train AI models, ours or anyone
else's.

**Legal bases (for users in the EU, the EEA and the UK).** We rely on:
- **contract:** providing the service, your account and billing;
- **legitimate interests:** keeping the service secure, preventing abuse,
  and keeping the audit and operational logs;
- **legal obligation:** tax and accounting records, and answering lawful
  requests;
- **consent:** analytics cookies on our public websites, and the
  waitlist. You can withdraw consent at any time.

## Who can see your memory

- **You**, and the apps and keys you've approved. You can see every
  connection, and revoke any of them, in your console.
- **Your team**, for catalogs that belong to a shared team. The team's
  members can read them, and owners manage membership.
- **Telekin staff, only through a recorded unlock.** Telekin's server
  blocks staff from opening a customer's catalog unless they deliberately
  unlock it and give a reason. We do this only when you ask for help, or
  when we have to (for example to investigate abuse or to answer a lawful
  request). Each unlock is written to the audit log, which you can see,
  and we email you when it happens.
- **Infrastructure access.** Today only the founder can reach the
  servers, the database and the hosting account. If we hire, anyone who
  runs the infrastructure will need an audited break-glass procedure to
  get access.

**What this is and isn't.** These controls make access deliberate and
visible. They aren't end-to-end encryption. Telekin has to read your notes
to search them and serve them to your AI apps, so the service itself can
technically read them. The controls above keep people from doing so
quietly.

## Your AI apps

When an AI app reads from Telekin, what it reads goes into your
conversation with that app. That app's provider handles it under their own
privacy policy, not ours. Check the privacy settings of each app you
connect.

## Who we share data with

We share personal data only with the service providers who help us run
Telekin, and only what each one needs:

| Provider | What for | What they receive |
|---|---|---|
| Amazon Web Services | Hosting, the database, backups, operational logs (CloudWatch), sending email (Amazon SES) | Everything stored in Telekin, encrypted at rest |
| Stripe | Payments, invoices, the customer portal | Billing details; your email |
| Forminit | The waitlist form | Waitlist signups |
| Google (Google Analytics) | Website analytics | Usage data from our public websites, including IP address and browser details |
| Sentry | Error reports, traces and logs | Operational data, identified only by internal random IDs |

Telekin's data is stored in the United States: in AWS's Ohio region
(us-east-2), with a disaster-recovery copy in AWS's Oregon region
(us-west-2).

Beyond those providers, we disclose data only:
- when the law requires it, and we'll tell you unless we're prohibited
  from doing so;
- to protect people or the service from harm or abuse;
- if Hypotheosis is sold or merged. We'll tell you before your data
  becomes subject to a different policy.

## Security

- Traffic between your apps and Telekin is encrypted with TLS.
- Telekin's connection to its database is encrypted, and the database is
  encrypted at rest.
- Passwords are stored only as one-way hashes. Card details never touch
  our systems.
- Staff access to memory needs a recorded unlock, as described above.

No service can promise perfect security. If a breach affects your
personal data, we'll tell you, and the authorities where required,
without undue delay.

## How long we keep it

- **While you're subscribed:** for as long as your account exists.
- **After your subscription ends:** your team is suspended and its data
  is kept, unchanged, for **30 days**. During that time you can download
  your catalogs or renew. We email reminders before the end. Then we
  delete:
  - **for your personal plan:** your catalogs, then your account
    (including your keys, grants, sessions, email and sign-in methods).
    If you're still a member of another team, we keep your account so you
    can keep using that team, and delete only your personal catalogs;
  - **for a shared team:** its catalogs and the team itself. Its members'
    own accounts aren't affected.
- **Deleted catalogs go entirely,** including their history.
- **The audit log is kept for 400 days**, including the IP addresses in it. After an account is deleted, its entries stay, but
  they no longer name you: they say "deleted user #N".
- **The deletion record:** we keep a log that a team was deleted, and
  when, with no content and no email address.
- **Billing records** (invoices and payment history, in Stripe and in our
  records) are kept for 7 years, as tax and accounting law requires, even
  after your account is deleted.
- **Backups** (including the disaster-recovery copy) expire after 14
  days. Data deleted from the service is gone from every backup within 14
  days of its deletion.
- **Free or complimentary access** (for early testers, for example) works
  the same way when it ends: suspension, then 30 days, then deletion. The
  notice tells you how to reach us.

## Your choices and rights

You can:
- **see and change** your account details in the console;
- **revoke** any app or key at any time;
- **download** your catalogs yourself from the console, at any time,
  including during the 30 days after a subscription ends;
- **delete** a catalog, or your whole account, by asking us;
- **object to or restrict** some uses, and **withdraw consent** where we
  rely on it;
- **complain** to your local data protection authority.

Depending on where you live (for example the EU, the UK or California),
you may have further rights. We honour these requests wherever you live.
We answer within one month (45 days for California residents), and tell
you if we need longer.

To make a request, write to privacy@telekin.ai. We may need to confirm
it's you before acting.

## Children

Telekin is for adults. You must be 18 or older to use it, and we don't
knowingly collect data from anyone younger. If you think a child has given us
data, contact us and we'll delete it.

## International transfers

Telekin stores and processes your data in the United States. If you use
Telekin from outside the US, your data is transferred to the US because
that's necessary to provide the service you asked for (for users in the
EU, the EEA and the UK, Article 49(1)(b) of the GDPR). Our service
providers protect any further transfers with the EU-US Data Privacy
Framework or the European Commission's standard contractual clauses.

## Changes to this policy

When we change this policy, we'll update the date at the top. For a
significant change, we'll email account holders before it takes effect.

## Contact

Hypotheosis LLC, 78 Glocker Way Suite #264, Pottstown, PA 19465,
privacy@telekin.ai.

---

## Reviewer notes (not part of the policy)

Facts this draft relies on, with where each comes from:
- **Retention:** 30 days from suspension, reminder emails, then deletion
  in the stated order, with the shared-team exception. Source: the
  telekin-platform design, "Retention and deletion", and the P3 plan.
  Production deletion runs off by default (a dry run) until the founder
  switches it on. **The policy's deletion promise mustn't go live before
  deletion does.**
- **Staff access:** the Telekin okf-mcp is set up with `require_unlock`.
  Unlocks need a reason and are recorded in the audit log. Team owners
  read their team's audit entries in the console. The email on unlock will be
  on before paid launch (founder, 2026-11-17); the policy can't go live
  before it is.
- **Encryption:** TLS to the service; TLS from the service to its
  database; the database encrypted at rest (founder, 2026-11-17). Today
  only the founder has access, and any future staff will use audited
  break-glass access.
- **Audit log:** it records client IPs of web requests. Entries outlive a
  deleted account, renamed to "deleted user #N". It is kept for
  `audit_retention_days` (okf-mcp default 400; between 30 and 3650).
- **Sessions:** they store the IP address and user-agent, and the user can
  see them in the console.
- **The platform's own database:** it holds billing state only (Stripe
  IDs, status, plan, suspension and deletion dates, invites, processed
  webhook IDs) and no catalog content. Emails are held only as Stripe and
  okf-mcp already hold them. The deletion log carries no email.
- **Mail:** production sends through Amazon SES (founder, 2026-11-17).
- The docs page "Your data" already promises no training on customer data,
  encryption in transit and at rest, and that support reads catalogs only
  with permission. This draft is consistent with it. Check the docs page
  again when this is final.

- **Analytics:** the founder will add Google Analytics (2026-11-17). Before
  it goes on telekin.ai, update that site's privacy page, which says "no
  cookies, no analytics", and add a consent banner for EU and UK visitors.
  Consider IP anonymisation, and turning off Google signals and ad
  features.

- **EU and UK:** Telekin doesn't target the EU or UK (USD pricing,
  English only, no EU or UK marketing) but accepts signups from there. So
  no GDPR Article 27 representative is appointed for now. The founder will
  appoint EU and UK representatives once revenue from those regions covers
  the cost (founder, 2026-11-17). The rights section applies to everyone
  regardless.
- **Export:** self-serve from the console at launch (founder, 2026-11-17).
  Update the docs page "Your data", which still says export is by request.

- **Before it goes live:** production deletion is switched on
  (`retention.delete_enabled`, P3 task #91); the email on unlock is on;
  `audit_retention_days` is 400; Aurora backup retention is 14 days in both
  regions; Sentry is set to send no default PII (`send_default_pii` off,
  with IP addresses and request bodies scrubbed); and if Google Analytics
  is added, there is a consent banner and an updated telekin.ai privacy
  page. Also set the "Last updated" date.

Questions for the lawyer (if it gets a review):
1. Is "only through a recorded unlock" strong enough as worded, given
   that the service can technically read the data? We say plainly that it
   isn't end-to-end encryption. Is that enough?
2. Is the policy enough on its own, or does it also need a data
   processing agreement for team customers (the team as controller, us as
   processor)?
3. The legal bases, the GDPR/CCPA sections, the age threshold, and the
   wording on international transfers.
4. Whether the Claude Connectors Directory and the plugin store need
   anything this doesn't cover.
5. "We'll tell you before your data becomes subject to a different
   policy" in a sale: is that commitment wise?
