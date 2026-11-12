import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { Fragment } from 'react';
import Book from '~icons/ph/book';
import CardsThree from '~icons/ph/cards-three';
import s from './nav.module.css';
import { Search } from './search';
import { ThemeButton } from './theme-button';

const navList = [
  { text: 'Home', to: '/' },
  { text: 'Posts', to: '/posts' },
  { text: 'Projects', to: '/projects' },
];
const mobileNavList = [
  { text: 'Posts', to: '/posts', Icon: Book },
  { text: 'Projects', to: '/projects', Icon: CardsThree },
];

const desktopSep = clsx(s.navbarSeparator, s.desktop);
const desktopButton = clsx(s.navbarButton, s.desktop);
const mobileSep = clsx(s.navbarSeparator, s.mobile);
const mobileButton = clsx(s.navbarButton, s.mobile);

export function Nav() {
  return (
    <div className={s.content}>
      <nav className={s.navbar}>
        <Link to='/' className={s.title} aria-label='silvecor.dev'>
          silvecor<span>.</span>dev
        </Link>
        <div className={desktopSep} />
        {navList.map(({ text, to }) => (
          <Fragment key={text}>
            <Link to={to} className={desktopButton}>
              {text}
            </Link>
            <div className={desktopSep} />
          </Fragment>
        ))}
      </nav>

      <div className={s.contentSeparator} />

      <div className={s.navbar}>
        <div className={s.navbarSeparator} />
        {mobileNavList.map(({ text, to, Icon }) => (
          <Fragment key={text}>
            <Link to={to} className={mobileButton} aria-label={text}>
              <Icon />
            </Link>
            <div className={mobileSep} />
          </Fragment>
        ))}
        <Search className={s.navbarButton} />
        <div className={s.navbarSeparator} />
        <ThemeButton className={s.navbarButton} />
        <div className={s.navbarSeparator} />
      </div>
    </div>
  );
}
