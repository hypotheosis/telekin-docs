// @ts-check
import { existsSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import starlightLinksValidator from 'starlight-links-validator';
import { FEEDBACK_URL, SITE_URL } from './src/site-config.mjs';

// The sitemap lists every page except the tester section, which stays out of
// search (its pages carry a robots noindex meta in their frontmatter). Adding
// @astrojs/sitemap here stops Starlight adding its own, unfiltered one.
const sitemapIntegration = sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/testers/') });

// The tester section is deleted at launch; the sidebar must not break when it is.
const hasTesters = existsSync('./src/content/docs/testers');

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemapIntegration,
    starlight({
      title: 'Telekin',
      description: 'A memory your AIs share, and you own.',
      plugins: [starlightLinksValidator()],
      customCss: ['./src/styles/forms.css'],
      components: {
        SocialIcons: './src/components/HeaderLinks.astro',
        // Adds HeyCatch analytics and its consent banner to every page.
        Footer: './src/components/Footer.astro',
      },
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
      ],
    }),
  ],
});
