import { Toc } from '@ark-ui/react';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { posts } from 'collections';
import { useRef } from 'react';
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
  preload: false,
});

function PostsComponent() {
  const post = Route.useLoaderData();
  const contentRef = useRef<HTMLElement | null>(null);

  return (
    <Toc.Root asChild items={post.content.toc} scrollEl={() => contentRef.current}>
      <article data-pagefind-body>
        <Toc.Content ref={contentRef}>
          <h1>{post.title}</h1>
          {/* eslint-disable-next-line react/dom-no-dangerously-set-innerhtml */}
          <div className='prose' dangerouslySetInnerHTML={{ __html: post.content.html }} />
        </Toc.Content>

      </article>
    </Toc.Root>
  );
}
