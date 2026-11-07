import { Toc } from '@ark-ui/react';
import { createFileRoute, notFound } from '@tanstack/react-router';
import clsx from 'clsx';
import { useRef } from 'react';
import { formatDate } from '@/lib/date';
import { metadata } from '@/lib/metadata';
import { getPostContent } from '@/lib/post-content';
import { getPosts } from '@/lib/posts';
import s from './$.module.css';

export const Route = createFileRoute('/posts/$')({
  component: PostsComponent,
  loader: async ({ params }) => {
    const post = getPosts().find(i => i.slug === params._splat);
    if (!post) throw notFound();
    return { ...post, ...(await getPostContent(params._splat!)) };
  },
  head: ({ loaderData: post }) => post ? metadata({
    isArticle: true,
    slugs: ['posts', post!.slug!],
    image: post!.banner?.dark?.src,
    ...post,
  }) : {},
  preload: false,
});

function PostsComponent() {
  const post = Route.useLoaderData();
  const contentRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <section className={clsx(s.container, s.titleContainer)}>
        <div className={s.titleContent}>
          <p className={s.tags}>
            {post.tags?.map(tag => (
              <span className={s.tag} key={tag}># {tag}</span>
            ))}
          </p>
          <h1 className={s.title} data-pagefind-meta='title'>{post.title}</h1>
        </div>
        <p className={s.meta}>
          <span className={s.head}>META</span>
          <div className={s.separator} />
          <span>{formatDate(post.date)}</span>
          <span>{post.meta.readingTime} min</span>
        </p>
        <p className={s.description}>
          <span className={s.head}>DESC</span>
          <div className={s.separator} />
          <span>{post.description}</span>
        </p>
      </section>
      <Toc.Root className={s.container} items={post.content.toc} scrollEl={() => contentRef.current}>
        {/* eslint-disable-next-line react/dom-no-dangerously-set-innerhtml */}
        <Toc.Content className={clsx(s.content, 'prose')} ref={contentRef} data-pagefind-body dangerouslySetInnerHTML={{ __html: post.content.html }} />
        <Toc.Nav className={s.tocContainer}>
          <div className={s.tocContent}>
            <Toc.Title>On this page</Toc.Title>
            <Toc.List>
              <Toc.Indicator />
              {post.content.toc.map(item => (
                <Toc.Item item={item} key={item.value}>
                  <Toc.Link href={`#${item.value}`}>{item.label}</Toc.Link>
                </Toc.Item>
              ))}
            </Toc.List>
          </div>
        </Toc.Nav>
      </Toc.Root>
    </>
  );
}
