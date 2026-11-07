import { createFileRoute, notFound } from '@tanstack/react-router';
import clsx from 'clsx';
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
      <section className={s.container}>
        {/* eslint-disable-next-line react/dom-no-dangerously-set-innerhtml */}
        <article className={clsx(s.content, 'prose')} data-pagefind-body dangerouslySetInnerHTML={{ __html: post.content.html }} />
        <aside className={s.tocContainer}>
          <div className={s.tocContent}>
            <h3>On this page</h3>
            <ul>
              {post.content.toc.map(item => (
                <li key={item.value}>
                  <a href={`#${item.value}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
