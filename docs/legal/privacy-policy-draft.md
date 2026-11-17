# Telekin privacy policy (DRAFT)

> **Draft for legal review, 2026-11-17. Not published.** This file is in
> the repository's `docs/` folder, not in `src/content/`, so the docs site
> doesn't serve it. Lines marked **[CONFIRM]** are facts or choices that
> still need deciding, or that need checking against production before
> this goes live. "Reviewer notes" at the end lists what the lawyer should
> look at. When it's approved, it replaces the waitlist-only page on
> telekin.ai (`telekin-site/src/pages/privacy.astro`), and the docs page
> "Your data" links to it.

**Last updated:** [date of publication]

Telekin is a long-term memory for your AI apps. It is run by Hypotheosis
**[CONFIRM: legal entity name, form and registered address]** ("we",
"us"). This policy explains what we collect when you use Telekin, why, who
we share it with, how long we keep it, and what you can ask us to do with
it.

Questions or requests: **[CONFIRM: privacy contact address]**.

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
- Operational logs and error reports, which we use to keep the service
  running. **[CONFIRM: what the production logs and telemetry contain and
  where they are sent. They should not contain memory content.]**

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
- Our public websites set no cookies and run no analytics. The Telekin
  console uses cookies only to keep you signed in and to protect forms
  against forgery. **[CONFIRM: still true at launch.]**

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
- **To tell you about Telekin:** product news, but only if you agreed, and
  you can unsubscribe at any time. **[CONFIRM: do we send any marketing
  email to customers?]**

We don't sell your personal information. We don't use your memory for
advertising, and we don't use it to train AI models, ours or anyone
else's.

**[CONFIRM with the lawyer: the legal bases for EU and UK users, likely
contract for the service and billing, legitimate interests for security,
legal obligation for records, and consent for marketing.]**

## Who can see your memory

- **You**, and the apps and keys you've approved. You can see every
  connection, and revoke any of them, in your console.
- **Your team**, for catalogs that belong to a shared team. The team's
  members can read them, and owners manage membership.
- **Telekin staff, only through a recorded unlock.** Telekin's server
  blocks staff from opening a customer's catalog unless they deliberately
  unlock it and give a reason. We do this only when you ask for help, or
  when we have to (for example to investigate abuse or to answer a lawful
  request). Each unlock is written to the audit log, which you can see.
  **[CONFIRM: before paid launch, turn on the email that tells you when a
  catalog of yours is unlocked, then change this to say you're emailed
  too.]**
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
| Amazon Web Services | Hosting, the database, backups **[CONFIRM: and sending email through SES]** | Everything stored in Telekin, encrypted at rest |
| Stripe | Payments, invoices, the customer portal | Billing details; your email |
| Forminit | The waitlist form | Waitlist signups |
| **[CONFIRM: email provider, if not SES]** | Sending account and billing emails | Your email address and the message |
| **[CONFIRM: error or telemetry provider, if any]** | Keeping the service running | Operational data |

**[CONFIRM: the AWS region where data is stored.]**

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
- **The audit log is kept for [CONFIRM: production `audit_retention_days`,
  default 400] days.** After an account is deleted, its entries stay, but
  they no longer name you: they say "deleted user #N".
- **The deletion record:** we keep a log that a team was deleted, and
  when, with no content and no email address.
- **Billing records** are kept as long as tax and accounting law
  requires, in Stripe and in our records. **[CONFIRM: period with the
  accountant.]**
- **Backups** are overwritten within **[CONFIRM: backup retention
  period]**. Data deleted from the service disappears from backups by
  then.
- **Free or complimentary access** (for early testers, for example) works
  the same way when it ends: suspension, then 30 days, then deletion. The
  notice tells you how to reach us.

## Your choices and rights

You can:
- **see and change** your account details in the console;
- **revoke** any app or key at any time;
- **download** your catalogs (today by asking us; a self-serve export is
  planned) **[CONFIRM: what's self-serve at launch]**;
- **delete** a catalog, or your whole account, by asking us;
- **object to or restrict** some uses, and **withdraw consent** where we
  rely on it;
- **complain** to your local data protection authority.

Depending on where you live (for example the EU, the UK or California),
you may have further rights. We'll honour these requests wherever you
live. **[CONFIRM with the lawyer: the GDPR, UK GDPR and CCPA/CPRA wording
and response times; whether we need an EU or UK representative.]**

To make a request, write to **[privacy contact]**. We may need to confirm
it's you before acting.

## Children

Telekin isn't meant for children under **[CONFIRM: 13 / 16]**, and we
don't knowingly collect their data. If you think a child has given us
data, contact us and we'll delete it.

## International transfers

**[CONFIRM: where data is stored and processed, and the mechanism for
transfers from the EU and UK (for example the EU-US Data Privacy
Framework, or standard contractual clauses with our providers).]**

## Changes to this policy

When we change this policy, we'll update the date at the top. For a
significant change, we'll email account holders before it takes effect.

## Contact

Hypotheosis **[CONFIRM: entity and address]**,
**[privacy contact address]**.

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
  read their team's audit entries in the console. The email on unlock is
  planned for paid launch (founder, 2026-11-17).
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
- **Mail:** the platform's mailer supports SES and SMTP. Which one
  production uses is still open.
- The docs page "Your data" already promises no training on customer data,
  encryption in transit and at rest, and that support reads catalogs only
  with permission. This draft is consistent with it. Check the docs page
  again when this is final.

Questions for the lawyer:
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
