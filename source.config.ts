import { defineCollections } from 'fumadocs-mdx/config';
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
