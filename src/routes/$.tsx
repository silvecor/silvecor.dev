import { data, Link } from 'react-router';
import { Metadata } from 'src/components/metadata';
import ArrowLeft from '~icons/ph/arrow-left';
import s from '@/layouts/$.module.css';

export async function loader() {
  return data({}, 404);
}

export default function NotFound() {
  return (
    <div className={s.container}>
      <Metadata title='404' />
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
