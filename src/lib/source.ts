import { authors, blog as blogCollection, projects } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';

export const blog = loader({
  baseUrl: '/posts',
  source: toFumadocsSource(blogCollection, []),
});

export { authors, projects };
