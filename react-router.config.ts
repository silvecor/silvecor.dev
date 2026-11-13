import type { Config } from '@react-router/dev/config';
import posts from '.velite/posts.json';

export default {
  appDirectory: 'src',
  buildDirectory: 'dist',
  ssr: true,
  async prerender({ getStaticPaths }) {
    const slugs = posts.map(i => `/posts/${i.slug}`);
    return [
      ...getStaticPaths(),
      ...slugs,
    ];
  },
} satisfies Config;
