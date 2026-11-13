import type { Route } from './+types/posts._index';
import { Fragment } from 'react';
import { Metadata } from '@/components/metadata';
import { Post } from '@/components/post';
import s from '@/layouts/posts._index.module.css';
import { getSortedPosts } from '@/lib/posts.server';

export async function loader() {
  return getSortedPosts();
}

function getYear(date: string) {
  return new Date(date).getFullYear();
}

export default function Posts({ loaderData }: Route.ComponentProps) {
  const posts = loaderData;

  const yearIndex: Record<number, number> = {};
  for (let i = 0; i < posts.length; ++i) {
    const currentYear = getYear(posts[i]!.date);
    if (i === 0 || currentYear !== getYear(posts[i - 1]!.date)) {
      yearIndex[i] = currentYear;
    }
  }

  return (
    <div className={s.posts}>
      <Metadata title='Posts' slugs={['posts']} />
      <h2 className={s.postsHeading}>Posts</h2>
      <ul className={s.postsContainer}>
        {posts.map((post, i) => (
          <Fragment key={post.title}>
            {!!yearIndex[i] && <li><h3 className={s.postsSubheading}>Year {yearIndex[i] % 100}</h3></li>}
            <Post post={post} />
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
