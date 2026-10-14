import { Dialog, Input } from '@base-ui/react';
import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { Fragment, type ReactNode, useDeferredValue, useEffect, useState } from 'react';
import SearchIcon from '~icons/ph/magnifying-glass';
import s from './search.module.css';

interface PagefindData {
  url: string;
  excerpt: string;
  meta: { title?: string };
}

interface PagefindResult {
  id: string;
  data: ()=> Promise<PagefindData>;
}

declare global {
  var pagefind: undefined | {
    init: ()=> void;
    debouncedSearch: (query: string)=> Promise<{ results: PagefindResult[] } | null>;
  };
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
function ResultList({ results }: { results: PagefindData[] }) {
  return (
    <>
      {results.map(i => (
        <Link className={s.resultItem} to={i.url as any} key={i.url}>
          <strong>{i.meta.title ?? i.url}</strong>
          <p>{getResultText(i.excerpt)}</p>
        </Link>
      ))}
    </>
  );
}

export function Search({ className }: { className?: string }) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [status, setStatus] = useState<string | null>('Type above to search.');
  const [results, setResults] = useState<PagefindData[]>([]);

  useEffect(() => {
    globalThis.pagefind?.init();
  }, []);

  useEffect(() => {
    void (async value => {
      if (value === '') {
        setStatus('Type above to search.');
        setResults([]);
        return;
      }
      if (typeof (globalThis.pagefind) === 'undefined') {
        setStatus('Failed to load the search module. Try refreshing the page, and check if your browser is too old.');
        setResults([]);
        return;
      }
      const resp = await globalThis.pagefind.debouncedSearch(value);
      if (!resp) {
        setStatus('No results found.');
        setResults([]);
        return;
      }
      const results = await Promise.all(resp.results.slice(0, 5).map(i => i.data()));
      setResults(results);
      if (results.length === 0) {
        setStatus('No results found.');
      } else {
        setStatus(null);
      }
    })(deferredQuery);
  }, [deferredQuery]);

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
                value={query}
                onValueChange={setQuery}
              />
            </section>
            <section className={s.popupResult}>
              {status && <div className={s.status}>{status}</div>}
              <ResultList results={results} />
            </section>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
