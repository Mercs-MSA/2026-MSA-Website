import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The "news" collection. Each Markdown file in src/content/news/ becomes one
// news post. Sveltia CMS edits these same files through a friendly form, so the
// fields here must line up with the fields defined in public/admin/config.yml.
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
  }),
});

export const collections = { news };
