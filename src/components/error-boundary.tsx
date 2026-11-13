import type { Route } from './+types/root';
import { isRouteErrorResponse, Link } from 'react-router';
import ArrowLeft from '~icons/ph/arrow-left';
import s from './error-boundary.module.css';

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const isRouteError = isRouteErrorResponse(error);
  const message = isRouteError ? `${error.status} ${error.statusText}` : error?.message;
  const detail = isRouteError ? error.data : error?.stack;

  return (
    <div className={s.container}>
      <section className={s.info}>
        <h1 className={s.title}>Client Error</h1>
        <p className={s.desc}>Something went wrong... {message}</p>
        <pre className={s.detail}>{detail}</pre>
      </section>
      <Link to='/' className={s.button}>
        <ArrowLeft />
        Home
      </Link>
    </div>
  );
}
