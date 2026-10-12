// import { authors, posts, projects } from 'collections/server';
// import { loader } from 'fumadocs-core/source';
// import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
//
// export const source = loader({
//   baseUrl: '/posts',
//   source: toFumadocsSource(posts, []),
// });
//
// export const getPages = () => source.getPages().sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
//
// export { authors, posts, projects };

import { localMd } from '@fumadocs/local-md';
import { loader } from 'fumadocs-core/source';

const posts = localMd({
  dir: 'content/posts',
});

export const source = loader(await posts.staticSource(), {
  baseUrl: '/posts',
});
