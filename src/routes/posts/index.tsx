import { createFileRoute } from '@tanstack/react-router';
import { posts } from 'collections';
import { Post } from '@/components/post';
import s from './index.module.css';

export const Route = createFileRoute('/posts/')({
  component: RouteComponent,
  loader: () => posts,
});

function RouteComponent() {
  const posts = Route.useLoaderData();

  return (
    <div className={s.posts}>
      <h2 className={s.postsHeading}>Posts</h2>
      <ul className={s.postsContainer}>
        {posts.map(i => <Post key={i.title} post={i} />)}
      </ul>
    </div>
  );
}
