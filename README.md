# Telekin docs

The documentation site for Telekin, built with Astro Starlight.

## Develop

```bash
npm ci
npm run dev        # http://localhost:4321
```

## Check before you push

```bash
npm run build && npm run check
npm run check:testers   # the site must build without the tester section
```

## Analytics

Analytics is HeyCatch (`src/components/Analytics.astro`, added to every page
by the Footer override), set up the same way as telekin.ai: a consent banner
for EU, EEA, UK and Swiss visitors, and off everywhere for browsers that send
Global Privacy Control or Do Not Track. A small Worker in front of the static
site (`worker/index.mjs`) tells the page the visitor's country and handles
HeyCatch's one-letter short links (`/a`–`/z`, `/0`–`/9`). Old-URL redirects
stay in `public/_redirects`. `astro preview` doesn't run the Worker, so
locally every visitor gets the banner; `npx wrangler dev` runs it.

`npm run check:consent` tests the consent flow in headless Chrome against a
running preview (`npx astro preview --port 4321`), with every request to
HeyCatch stubbed out locally. It needs Chrome, so it isn't part of the build.

## Where things go (Diataxis)

- `src/content/docs/start/`: tutorials (learning by doing)
- `src/content/docs/how-to/`: one task per page
- `src/content/docs/reference/`: facts to look up
- `src/content/docs/explanation/`: understanding and background
- `src/content/docs/testers/`: tester-only pages, kept out of search (noindex,
  robots.txt and the sitemap) and deleted when the test ends.
  Nothing outside this folder may link into it.

Client setup pages must carry `<LastChecked date="YYYY-MM-DD" />`, checked
against the client's current official docs.

The site URL and feedback link live in `src/site-config.mjs`.
