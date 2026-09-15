import type { ComponentPropsWithRef } from 'react';
import clsx from 'clsx';
import { Link } from 'waku';
import s from './text-link.module.css';

export interface TextLinkProps extends ComponentPropsWithRef<'a'> {
  to?: ComponentPropsWithRef<typeof Link>['to'];
}

export function TextLink({ className, ...props }: TextLinkProps) {
  if (props.to) {
    return <Link className={clsx(s.link, className)} to={props.to} {...props as any} />;
  }
  return <a className={clsx(s.link, className)} target='_blank' rel='nofollow noreferrer noopener' {...props} />;
}
