import { createFileRoute, Link } from '@tanstack/react-router';
import { Fragment } from 'react';
import ArrowUpRight from '~icons/ph/arrow-up-right';
import Binary from '~icons/ph/binary';
import Email from '~icons/ph/envelope-simple';
import GitHub from '~icons/ph/github-logo';
import Earth from '~icons/ph/globe-hemisphere-east-duotone';
import Twitter from '~icons/ph/twitter-logo';
import { Post } from '@/components/post';
import { metadata } from '@/lib/metadata';
import { getRecentPosts } from '@/lib/posts';
import s from './index.module.css';

const actions = [
  { label: 'email', icon: Email, href: 'mailto:me@silvecor.dev' },
  { label: 'github', icon: GitHub, href: 'https://github.com/silvecor' },
  { label: 'twitter', icon: Twitter, href: 'https://x.com/silvecor3' },
  { label: 'knowledge base', icon: Binary, href: 'https://kb.silvecor.dev' },
];

export const Route = createFileRoute('/')({
  loader: () => {
    return getRecentPosts();
  },
  component: HomeComponent,
  head: () => metadata({ title: 'Home' }),
});

function HomeComponent() {
  const recentPosts = Route.useLoaderData();

  return (
    <div className={s.container}>
      <section className={s.hero}>
        <div className={s.intro}>
          <h1 className={s.name}>Silver Chloride</h1>
          <p className={s.handle}>@silvecor</p>
        </div>
        <div className={s.actionsContainer}>
          <div className={s.actions}>
            {actions.map((i, index) => (
              <Fragment key={i.label}>
                {index !== 0 && <div className={s.actionSeparator} />}
                <a target='_blank' rel='nofollow noreferrer noopener' href={i.href} title={i.label} aria-label={i.label} className={s.action}>
                  <i.icon />
                </a>
              </Fragment>
            ))}
          </div>
        </div>
        <div className={s.descContainer}>
          <p className={s.descHeader}>someone on the&nbsp;<Earth />, also a</p>
          <p><span>Digital</span>&nbsp;Designer</p>
          <p><span>Front-end OSS</span>&nbsp;Developer</p>
        </div>
      </section>
      <section className={s.posts}>
        <h2 className={s.postsHeading}>Posts</h2>
        <ul className={s.postsContainer}>
          {recentPosts.map(i => <Post key={i.title} post={i} />)}
        </ul>
        <Link to='/posts' className={s.postsMore}>
          View more <ArrowUpRight />
        </Link>
      </section>
    </div>
  );
}
