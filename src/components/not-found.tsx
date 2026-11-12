import { Link } from '@tanstack/react-router';
import ArrowLeft from '~icons/ph/arrow-left';
import s from './not-found.module.css';

export function NotFound() {
  return (
    <div className={s.container}>
      <title>404 | silvecor.dev</title>
      <section className={s.info}>
        <h1 className={s.title}>404</h1>
        <p className={s.desc}>How did we get here?</p>
      </section>
      <Link to='/' className={s.button}>
        <ArrowLeft />
        Home
      </Link>
    </div>
  );
}
