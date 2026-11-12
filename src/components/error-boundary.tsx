import { type ErrorComponentProps, Link } from '@tanstack/react-router';
import ArrowLeft from '~icons/ph/arrow-left';
import s from './error-boundary.module.css';

export function ErrorBoundary({ error }: ErrorComponentProps) {
  return (
    <div className={s.container}>
      <section className={s.info}>
        <h1 className={s.title}>Client Error</h1>
        <p className={s.desc}>Something went wrong...</p>
        <p className={s.detail}>{error instanceof Error && error.message}</p>
      </section>
      <Link to='/' className={s.button}>
        <ArrowLeft />
        Home
      </Link>
    </div>
  );
}
