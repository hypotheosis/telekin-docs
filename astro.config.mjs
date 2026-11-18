// @ts-check
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import { FEEDBACK_URL, SITE_URL, WAITLIST_URL } from './src/site-config.mjs';
import { walk } from './scripts/lib.mjs';

// NO SITEMAP until launch. Starlight adds @astrojs/sitemap itself unless an
// integration with that name is present, so this no-op takes its place, and
// the build-done hook strips the <link rel="sitemap"> tag Starlight adds.
// To undo at launch: delete this constant and remove it from `integrations`.
const noSitemap = {
  name: '@astrojs/sitemap',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const root = fileURLToPath(dir);
      for (const file of walk(root, ['.html'])) {
        const html = readFileSync(file, 'utf8');
        const out = html.replace(/<link rel="sitemap"[^>]*>/g, '');
        if (out !== html) writeFileSync(file, out);
      }
    },
  },
};

// The tester section is deleted at launch; the sidebar must not break when it is.
const hasTesters = existsSync('./src/content/docs/testers');

export default defineConfig({
  site: SITE_URL,
  integrations: [
    noSitemap,
    starlight({
      title: 'Telekin',
      description: 'A memory your AIs share, and you own.',
      plugins: [starlightLinksValidator()],
      customCss: ['./src/styles/forms.css'],
      components: { SocialIcons: './src/components/HeaderLinks.astro' },
      head: [
        { tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' } },
      ],
      sidebar: [
        {
          label: 'Start here',
          items: [
            // Listed by hand so the overview comes first, then the "what is it" page
            // (which lives in Explanation), then setting up your account, then the
            // tutorials. Add new tutorials here.
            'start',
            { label: 'What is Telekin?', link: '/explanation/what-is-telekin/' },
            'start/set-up-your-account',
            'start/first-15-minutes',
            'start/from-your-documents',
          ],
        },
        {
          label: 'How-to guides',
          items: [
            { label: 'Connect your AI', items: [{ autogenerate: { directory: 'how-to/connect' } }] },
            { label: 'More guides', items: [{ autogenerate: { directory: 'how-to/guides' } }] },
          ],
        },
        { label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }] },
        { label: 'Explanation', items: [{ autogenerate: { directory: 'explanation' } }] },
        { label: 'FAQ', link: '/faq/' },
        ...(hasTesters ? [{ label: 'For testers', items: [{ autogenerate: { directory: 'testers' } }] }] : []),
        { label: 'Send feedback', link: FEEDBACK_URL },
        { label: 'Join the waitlist', link: WAITLIST_URL },
      ],
    }),
  ],
});
