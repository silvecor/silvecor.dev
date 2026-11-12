import { posts, projects } from 'collections';
import { sortBy } from 'es-toolkit';

export function getPosts() {
  return posts;
}
export function getSortedPosts() {
  return sortBy(posts, [i => -new Date(i.date).getTime()]);
}
export function getRecentPosts(count: number = 3) {
  return getSortedPosts().slice(0, count);
}

export function getProjects() {
  return sortBy(projects, ['order']);
}
