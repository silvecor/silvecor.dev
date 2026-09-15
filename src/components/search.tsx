'use client';

import { Dialog, Input } from '@base-ui/react';
import clsx from 'clsx';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { fetchClient } from 'fumadocs-core/search/client/fetch';
import { Fragment, type ReactNode } from 'react';
import { Link } from 'waku';
import SearchIcon from '~icons/ph/magnifying-glass';
import s from './search.module.css';

interface Result {
  id: string;
  url: string;
  type: 'page' | 'heading' | 'text';
  content: string;
}
function getResultText(content: string) {
  const pattern = /<mark>([\s\S]*?)<\/mark>/g;
  const nodes: ReactNode[] = [];
  let prevIndex = 0;
  let match: RegExpExecArray | null = null;
  let key = 0;

  while ((match = pattern.exec(content)) !== null) {
    const [full, part] = match;

    if (match.index > prevIndex) {
      nodes.push(<Fragment key={++key}>{content.slice(prevIndex, match.index)}</Fragment>);
    }
    nodes.push(<span key={++key} className={s.target}>{part}</span>);
    prevIndex = match.index + full.length;
  }
  if (content.length > prevIndex) {
    nodes.push(<Fragment key={++key}>{content.slice(prevIndex)}</Fragment>);
  }

  return nodes;
}
function ResultList({ items }: { items?: Result[] | undefined }) {
  return (
    <>
      {items?.map(i => (
        <Link className={clsx(s.resultItem, s[i.type])} to={i.url as any} key={i.id}>
          {getResultText(i.content)}
        </Link>
      ))}
    </>
  );
}

export function Search({ className }: { className?: string }) {
  const { query, setSearch } = useDocsSearch({
    delayMs: 800,
    client: fetchClient(),
  });

  let statusText: string = '';

  if (query.isLoading) {
    statusText = 'Loading...';
  } else if (query.error) {
    statusText = 'Something went wrong. Open the console to see details.';
    console.error(query.error);
  } else if (query.data === 'empty') {
    // initial
    statusText = 'Type to search! At least 3 characters are required.';
  } else if (query.data?.length === 0) {
    statusText = 'No results found.';
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className={clsx(s.button, className)}>
        <SearchIcon />
      </Dialog.Trigger>
      <Dialog.Portal aria-label='search dialog'>
        <Dialog.Backdrop className={s.backdrop} />
        <Dialog.Viewport className={s.viewport}>
          <Dialog.Popup className={s.popup}>
            <section className={s.popupSearch}>
              <SearchIcon aria-hidden />
              <Input
                className={s.popupInput}
                type='search'
                autoComplete='off'
                placeholder='Search posts...'
                aria-label='search query'
                onValueChange={setSearch}
              />
            </section>
            <section className={s.popupResult}>
              {(typeof query.data !== 'object' || query.data.length === 0) && <div className={s.status}>{statusText}</div>}
              <ResultList items={query.data === 'empty' ? undefined : query.data} />
            </section>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
