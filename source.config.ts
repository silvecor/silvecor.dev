import rehypeMathML from '@daiji256/rehype-mathml';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { remarkGfm, remarkHeading } from 'fumadocs-core/mdx-plugins';
import { defineCollections } from 'fumadocs-mdx/config';
import rehypeExpressiveCode, { type RehypeExpressiveCodeOptions } from 'rehype-expressive-code';
import rehypeExternalLinks, { type Options as RehypeExternalLinksOptions } from 'rehype-external-links';
import remarkDirective from 'remark-directive';
import remarkMath from 'remark-math';
import { z } from 'zod';

export const blog = defineCollections({
  type: 'doc',
  dir: './content/posts',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    image: z.string().optional(),
    order: z.number().optional(),
    tags: z.array(z.string()).optional(),
    authors: z.array(z.string()),
  }),
  mdxOptions: {
    format: 'md',
    remarkPlugins: [
      remarkGfm,
      remarkHeading,
      remarkMath,
      remarkDirective,
    ],
    rehypePlugins: [
      rehypeMathML,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noopener', 'noreferrer'],
        } satisfies RehypeExternalLinksOptions,
      ],
      [
        rehypeExpressiveCode,
        {
          // TODO
          themes: ['ayu-light', 'kanagawa-dragon'],
          plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
          useDarkModeMediaQuery: false,
        } satisfies RehypeExpressiveCodeOptions,
      ],
    ],
  },
});

export const authors = defineCollections({
  type: 'meta',
  dir: './content/authors',
  schema: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    pronouns: z.string().optional(),
    bio: z.string().optional(),
    contacts: z.object({
      website: z.url().optional(),
      email: z.email().optional(),
      github: z.url().optional(),
      twitter: z.url().optional(),
    }).optional(),
  }),
});

export const projects = defineCollections({
  type: 'meta',
  dir: './content/projects',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string().optional(),
    link: z.url(),
    archived: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
});
