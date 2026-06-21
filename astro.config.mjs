// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // TODO: set this to the real production domain before launch.
  // It's used for canonical URLs, sitemaps, and RSS. A placeholder is fine for now.
  site: 'https://example.org',

  adapter: cloudflare(),
});