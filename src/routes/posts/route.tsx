import { createFileRoute, Outlet } from '@tanstack/react-router';
import s from './route.module.css';

export const Route = createFileRoute('/posts')({
  component: PostsLayoutComponent,
});

function PostsLayoutComponent() {
  return (
    <div>
      <div className={s.prose}>
        <Outlet />
      </div>
    </div>
  );
}
