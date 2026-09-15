import { Fragment } from 'react';
import { Link } from 'waku';
import s from './nav.module.css';
import { Search } from './search';
import { ThemeButton } from './theme-button';

const navList = [
  { text: 'Home', href: '/' },
  { text: 'Posts', href: '/posts' },
  { text: 'Projects', href: '/projects' },
];

export function Nav() {
  return (
    <div className={s.content}>
      <nav className={s.navbar}>
        <Link to='/' className={s.title} aria-label='silvecor.dev'>
          silvecor<span>.</span>dev
        </Link>
        <div className={s.navbarSeparator} />
        {navList.map(({ text, href }) => (
          <Fragment key={text}>
            <Link to={href as any} className={s.navbarButton}>
              {text}
            </Link>
            <div className={s.navbarSeparator} />
          </Fragment>
        ))}
      </nav>

      <div className={s.contentSeparator} />

      <div className={s.navbar}>
        <div className={s.navbarSeparator} />
        <Search className={s.navbarButton} />
        <div className={s.navbarSeparator} />
        <ThemeButton className={s.navbarButton} />
        <div className={s.navbarSeparator} />
      </div>
    </div>
  );
}
