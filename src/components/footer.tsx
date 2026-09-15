import s from './footer.module.css';
import { TextLink } from './text-link';

const contact = [
  { label: 'Email', href: 'mailto:me@silvecor.dev' },
  { label: 'GitHub', href: 'https://github.com/silvecor' },
  { label: 'Twitter', href: 'https://x.com/silvecor3' },
  { label: 'Discord', href: 'https://discordapp.com/users/1060072430355370094' },
];

const site = [
  { label: 'Changelog', to: '/changelog' },
  { label: 'RSS Feed', to: '/rss.xml' },
  { label: 'Sitemap', to: '/sitemap.xml' },
];

export function Footer() {
  return (
    <div className={s.content}>
      <section className={s.websiteInfo}>
        <h2 className={s.websiteTitle}>
          silvecor.dev
          <TextLink className={s.websiteVersion} href='https://github.com/silvecor/silvecor.dev'>
            #abcdef
          </TextLink>
        </h2>
        <div className={s.websiteCopyright}>
          Copyright © 2023-2026 silvecor. All rights reserved.
        </div>
      </section>
      <section className={s.site}>
        <h4 className={s.title}>Site</h4>
        {site.map(i => <TextLink key={i.label} to={i.to as any} className={s.link}>{i.label}</TextLink>)}
      </section>
      <section className={s.contact}>
        <h4 className={s.title}>Contact</h4>
        {contact.map(i => <TextLink key={i.label} href={i.href} className={s.link}>{i.label}</TextLink>)}
      </section>
    </div>
  );
}
