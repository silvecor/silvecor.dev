import { createFileRoute, notFound } from '@tanstack/react-router';
import { posts } from 'collections';
import { metadata } from '@/lib/metadata';
import { getPostContent } from '@/lib/post-content';

export const Route = createFileRoute('/posts/$')({
  component: PostsComponent,
  loader: async ({ params }) => {
    const post = posts.find(i => i.slug === params._splat);
    if (!post) throw notFound();
    return { ...post, ...(await getPostContent(params._splat!)) };
  },
  head: ({ loaderData: post }) => metadata({
    isArticle: true,
    slugs: ['posts', post!.slug!],
    image: post!.banner?.light?.src,
    ...post,
  }),
});

function PostsComponent() {
  const post = Route.useLoaderData();

  return (
    <article data-pagefind-body>
      <h1>{post.title}</h1>
      {/* eslint-disable-next-line react/dom-no-dangerously-set-innerhtml */}
      <div className='prose' dangerouslySetInnerHTML={{ __html: post.content.html }} />
    </article>
  );
}
