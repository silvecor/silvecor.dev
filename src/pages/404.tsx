import { Link } from 'waku';
import ArrowLeft from '~icons/ph/arrow-left';
import { Metadata } from '@/components/metadata';
import s from './404.module.css';

export default async function Home() {
  return (
    <div className={s.container}>
      <Metadata title='404' />
      <section className={s.info}>
        <h1 className={s.title}>404</h1>
        <p className={s.desc}>How did we get here?</p>
      </section>
      <Link to='/' className={s.button}>
        <ArrowLeft />
        Go back home
      </Link>
    </div>
  );
}
