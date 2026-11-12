import type { TocItem } from '@silvecor/markdown';
import { createIsomorphicFn } from '@tanstack/react-start';

interface Content {
  content: {
    html: string;
    toc: TocItem[];
  };
}

export const getPostContent = createIsomorphicFn()
  .server(async (key: string): Promise<Content> => {
    const path = `/content/posts/${key}.json`;

    try {
      // CF Assets, cold path
      const { env } = await import('cloudflare:workers');
      const res = await env.ASSETS.fetch(new URL(path, 'https://assets.local'));
      if (res.ok) return (await res.json()) as Content;
    } catch {
      // workerd
    }

    const { readFile } = await import('node:fs/promises');
    return JSON.parse(await readFile(`public${path}`, 'utf8')) as Content;
  })
  .client(async (key: string) => {
    const res = await fetch(`/content/posts/${key}.json`);
    if (!res.ok) throw new Error(`${key} was not found.`);
    return (await res.json()) as Content;
  });
