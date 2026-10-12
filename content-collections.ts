import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMarkdown } from '@content-collections/markdown';
import { z } from 'zod';

const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    date: z.iso.date(),
    description: z.string(),
    banner: z.object({
      light: z.string().optional(),
      dark: z.string().optional(),
    }).optional(),
    content: z.string(),
    tags: z.array(z.string()).optional(),
  }),
  transform: async (doc, ctx) => {
    const html = await compileMarkdown(ctx, doc);
    return {
      ...doc,
      html,
    };
  },
});

const projects = defineCollection({
  name: 'projects',
  directory: 'content/projects',
  include: '*.yaml',
  parser: 'yaml',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    link: z.url(),
    tags: z.array(z.string()).optional(),
  }),
});

export default defineConfig({
  content: [posts, projects],
});
