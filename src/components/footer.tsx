import s from './footer.module.css';
import { TextLink } from './text-link';

export function Footer() {
  return (
    <div className={s.content}>
      <section className={s.websiteInfo}>
        <h2 className={s.websiteTitle}>
          silvecor.dev
          <TextLink className={s.websiteVersion} href='https://github.com/silvecor/silvecor.dev'>
            #{__GIT_COMMIT_SHA__.slice(0, 6)}
          </TextLink>
        </h2>
        <div className={s.websiteCopyright}>
          Copyright © 2023-2026 silvecor. All rights reserved.
        </div>
      </section>
    </div>
  );
}
