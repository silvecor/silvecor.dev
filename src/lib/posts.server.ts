import type { TocItem } from '@silvecor/markdown';
import type { posts as postType } from 'collections/index';
import posts from 'collections/posts.json';
import projects from 'collections/projects.json';
import { sortBy } from 'es-toolkit';

export function getPosts() {
  return posts as postType[];
}
export function getSortedPosts() {
  return sortBy(posts, [i => -new Date(i.date).getTime()]);
}
export function getRecentPosts(count: number = 3) {
  return getSortedPosts().slice(0, count);
}

const postContent = import.meta.glob<{
  content: {
    html: string;
    toc: TocItem[];
  };
}>(
  'collections/posts/*.json',
  {
    import: 'default',
  },
);

export async function getPostContent(slug: string) {
  const content = postContent[`/.velite/posts/${slug}.json`];
  return content ? content() : undefined;
}

export function getProjects() {
  return sortBy(projects, ['order']);
}
