import { Fragment } from 'react';
import Binary from '~icons/ph/binary';
import Email from '~icons/ph/envelope-simple';
import GitHub from '~icons/ph/github-logo';
import Lightbulb from '~icons/ph/lightbulb-light';
import Twitter from '~icons/ph/twitter-logo';
import { Metadata } from '@/components/metadata';
import s from './index.module.css';

const actions = [
  { label: 'email', icon: Email, href: 'mailto:me@silvecor.dev' },
  { label: 'github', icon: GitHub, href: 'https://github.com/silvecor' },
  { label: 'twitter', icon: Twitter, href: 'https://x.com/silvecor3' },
  { label: 'knowledge base', icon: Binary, href: 'https://ob.silvecor.dev' },
];

export default async function Home() {
  return (
    <div className={s.container}>
      <Metadata title='Home' />
      <section className={s.hero}>
        <div className={s.intro}>
          <h1 className={s.name}>Silver Chloride</h1>
          <p className={s.handle}>@silvecor</p>
          <p className={s.tagline}>I make cool apps and fool snacks.</p>
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
          <p className={s.descHeader}><Lightbulb />&nbsp;Thoughtful</p>
          <p><span>Digital</span>&nbsp;Designer</p>
          <p><span>Front-end OSS</span>&nbsp;Developer</p>
        </div>
      </section>
    </div>
  );
}
