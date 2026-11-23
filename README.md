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

## Where things go (Diataxis)

- `src/content/docs/start/`: tutorials (learning by doing)
- `src/content/docs/how-to/`: one task per page
- `src/content/docs/reference/`: facts to look up
- `src/content/docs/explanation/`: understanding and background
- `src/content/docs/testers/`: tester-only pages, deleted at launch.
  Nothing outside this folder may link into it.

Client setup pages must carry `<LastChecked date="YYYY-MM-DD" />`, checked
against the client's current official docs.

The site URL and feedback link live in `src/site-config.mjs`.
