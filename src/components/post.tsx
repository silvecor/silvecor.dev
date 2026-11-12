import type { posts } from 'collections';
import { Link } from '@tanstack/react-router';
import ArrowUpRight from '~icons/ph/arrow-up-right';
import { formatDate } from '@/lib/date';
import s from './post.module.css';

function sanitizeImage({ src, width, height }: NonNullable<NonNullable<posts['banner']>['light']>) {
  return {
    src,
    width,
    height,
  };
}

export function Post({ post }: { post: posts }) {
  return (
    <li>
      <Link className={s.container} to='/posts/$' params={{ _splat: post.slug }}>
        <div className={s.banner} aria-hidden>
          {post.banner?.light && <img className={s.lightImage} alt='light banner' data-theme-light {...sanitizeImage(post.banner.light)} />}
          {post.banner?.dark && <img className={s.darkImage} alt='dark banner' data-theme-dark {...sanitizeImage(post.banner.dark)} />}
        </div>
        <div className={s.info}>
          <div className={s.entry}>
            <h3 className={s.title}>{post.title}</h3>
            <div className={s.meta}>
              <time dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              <span>
                {post.meta.readingTime} min read
              </span>
            </div>
            <p className={s.description}>
              {post.description}
            </p>
          </div>
          <div className={s.action} aria-hidden>
            <span className={s.actionTip}>Read more</span>
            <ArrowUpRight />
          </div>
        </div>
      </Link>
    </li>
  );
}
