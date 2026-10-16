import { createFileRoute } from '@tanstack/react-router';
import { Fragment } from 'react';
import { Post } from '@/components/post';
import { getSortedPosts } from '@/lib/posts';
import s from './index.module.css';

export const Route = createFileRoute('/posts/')({
  component: RouteComponent,
  loader: () => getSortedPosts(),
});

function getYear(date: string) {
  return new Date(date).getFullYear();
}

function RouteComponent() {
  const posts = Route.useLoaderData();

  const yearIndex: Record<number, number> = {};
  for (let i = 0; i < posts.length; ++i) {
    const currentYear = getYear(posts[i]!.date);
    if (i === 0 || currentYear !== getYear(posts[i - 1]!.date)) {
      yearIndex[i] = currentYear;
    }
  }

  return (
    <div className={s.posts}>
      <h2 className={s.postsHeading}>Posts</h2>
      <ul className={s.postsContainer}>
        {posts.map((post, i) => (
          <Fragment key={post.title}>
            {!!yearIndex[i] && <h3 className={s.postsSubheading}>Year {yearIndex[i] % 100}</h3>}
            <Post post={post} />
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
