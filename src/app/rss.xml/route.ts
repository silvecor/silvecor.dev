import { Feed } from 'feed';
import { getAllPosts } from '@/utils/posts';

export const dynamic = 'force-static';

export const GET = async () => {
  const posts = await getAllPosts();

  const feed = new Feed({
    title: 'hellolin.top',
    description: 'hellolin.top feed',
    id: 'https://hellolin.top/',
    link: 'https://hellolin.top/',
    updated: new Date(posts[0].date),
    copyright: 'hellolin, 2025',
    favicon: 'https://hellolin.top/icon.png',
    author: {
      name: 'hellolin',
      email: 'i@hellolin.top',
      link: 'https://hellolin.top/',
    },
    feedLinks: {
      rss2: 'https://hellolin.top/rss.xml',
    },
  });

  for (const post of posts) {
    const url = `https://hellolin.top/${post.permalink}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: post.raw,
      date: new Date(post.date),
      author: post.authors.map(e => ({ name: e })),
      ...post.image && { image: `https://hellolin.top${post.image.src}` },
      ...post.tags && { category: post.tags.map(e => ({ name: e })) },
    });
  }

  return new Response(feed.rss2(), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
