import { Collapsible, Progress } from '@ark-ui/react';
import { createFileRoute, notFound } from '@tanstack/react-router';
import clsx from 'clsx';
import { clamp, round, throttle } from 'es-toolkit';
import { useEffect, useRef, useState } from 'react';
import CaretRight from '~icons/ph/caret-right';
import Copyright from '~icons/ph/copyright';
import { TextLink } from '@/components/text-link';
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

const TOC_EPS = 20;

function PostsComponent() {
  const post = Route.useLoaderData();

  const [progress, setProgress] = useState<number>(0);
  const [heading, setHeading] = useState<string>(post.content.toc[0]?.label ?? '');
  const articleRef = useRef<HTMLElement>(null);
  const headingsRef = useRef<(HTMLElement | null)[]>([]);
  const tocListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    for (let i = 0; i < post.content.toc.length; ++i) {
      headingsRef.current[i] = document.querySelector(`#${post.content.toc[i]!.value}`);
    }

    const handleScroll = throttle(() => {
      const viewportHeight = window.innerHeight;
      const scrollableHeight = (articleRef.current?.scrollHeight ?? 0) - viewportHeight;
      const articleRect = articleRef.current?.getBoundingClientRect();
      const scrollProgress = -(articleRect?.top ?? 0);

      if (scrollableHeight <= 0 || scrollProgress <= 0) {
        setProgress(0);
      } else {
        setProgress(round(clamp((scrollProgress / scrollableHeight) * 100, 0, 100)));
      }

      let finalHeading = '';
      for (let i = 0; i < post.content.toc.length; ++i) {
        // const currentTocItem = post.content.toc[i]!;
        const currentHeading = headingsRef.current[i];
        const currentBottom = currentHeading?.getBoundingClientRect().bottom;

        // Highlight the whole chain from the root
        // const nextIndex = post.content.toc.findIndex((el, idx) => el.depth <= currentTocItem.depth && idx > i);
        // const nextHeading = nextIndex === -1 ? undefined : headingsRef.current[nextIndex];
        // const nextTop
        //   = nextIndex === -1
        //     ? articleRect?.bottom
        //     : nextHeading?.getBoundingClientRect().top;

        const nextHeading = headingsRef.current[i + 1];
        const nextTop
          = i + 1 === post.content.toc.length
            ? articleRect?.bottom
            : nextHeading?.getBoundingClientRect().top;

        const currentTocEl = tocListRef.current?.children[i];

        if (currentBottom && nextTop && currentBottom <= viewportHeight + TOC_EPS && nextTop >= TOC_EPS) {
          currentTocEl?.setAttribute('data-state', 'active');
          finalHeading = post.content.toc[i]?.label ?? '';
        } else if (nextTop && nextTop <= TOC_EPS) {
          currentTocEl?.setAttribute('data-state', 'read');
        } else {
          currentTocEl?.setAttribute('data-state', 'unread');
        }
      }
      setHeading(finalHeading);
    }, 100);

    const controller = new AbortController();
    window.addEventListener('scroll', handleScroll, {
      passive: true,
      signal: controller.signal,
    });
    window.addEventListener('resize', handleScroll, {
      signal: controller.signal,
    });
    return () => {
      controller.abort();
    };
  }, [post.content.toc]);

  return (
    <>
      <section className={s.titleContainer}>
        <div className={s.titleContent}>
          <p className={s.tags}>
            {post.tags?.map(tag => (
              <span className={s.tag} key={tag}># {tag}</span>
            ))}
          </p>
          <h1 className={s.title} data-pagefind-meta='title'>{post.title}</h1>
          <span className={s.titleDate}>{formatDate(post.date)}</span>
        </div>
        <p className={s.meta}>
          <span className={s.head}>META</span>
          <div className={s.separator} />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
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
        <article className={clsx(s.content, 'prose')} data-pagefind-body dangerouslySetInnerHTML={{ __html: post.content.html }} ref={articleRef} />
        <Collapsible.Root asChild>
          <Progress.Root defaultValue={0} value={progress} asChild>
            <aside className={s.tocContainer}>
              <Collapsible.Trigger className={s.tocTrigger}>
                <Progress.Circle className={s.circle}>
                  <Progress.CircleTrack className={s.circleTrack} />
                  <Progress.CircleRange className={s.circleRange} />
                </Progress.Circle>
                <span>{heading}</span>
                <Collapsible.Indicator className={s.tocIndicator}>
                  <CaretRight />
                </Collapsible.Indicator>
              </Collapsible.Trigger>
              <div className={s.tocContent}>
                <h2 className={s.tocTitle}>On this page</h2>
                <Progress.Track className={s.progressTrack}>
                  <Progress.Range className={s.progressRange} />
                </Progress.Track>
                <ul ref={tocListRef}>
                  {post.content.toc.map(item => (
                    <li key={item.value} className={s.tocItem} data-depth={item.depth}>
                      <a href={`#${item.value}`}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </Progress.Root>
        </Collapsible.Root>
        <div className={s.footer}>
          <div className={s.footerHead}>
            <h2 className={s.footerTitle}>{post.title}</h2>
            <time className={s.footerDate} dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <div className={s.copyright}><Copyright /> <TextLink href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</TextLink></div>
        </div>
      </section>
    </>
  );
}
