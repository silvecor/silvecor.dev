import { mkdir, writeFile } from 'node:fs/promises';
import { markdown } from '@silvecor/markdown';
import { defineCollection, defineConfig, s } from 'velite';

const posts = defineCollection({
  name: 'posts',
  pattern: 'posts/**/*.md',
  schema: s.object({
    title: s.string(),
    date: s.isodate(),
    description: s.string(),
    banner: s.object({
      light: s.image().optional(),
      dark: s.image().optional(),
    }).optional(),
    tags: s.array(s.string()).optional(),
    content: markdown(),
    slug: s.path().transform(path => path.split('/').pop()),
    meta: s.metadata(),
  }).transform(async ({ content, ...rest }) => {
    await mkdir('public/content/posts', { recursive: true });
    await writeFile(`public/content/posts/${rest.slug}.json`, JSON.stringify({ content }), { flag: 'w' });
    return rest;
  }),
});

const projects = defineCollection({
  name: 'projects',
  pattern: 'projects/*.yaml',
  schema: s.object({
    name: s.string(),
    order: s.number(),
    description: s.string(),
    link: s.string().url(),
    tags: s.array(s.string()).optional(),
  }),
});

export default defineConfig({
  root: 'content',
  collections: { posts, projects },
});
