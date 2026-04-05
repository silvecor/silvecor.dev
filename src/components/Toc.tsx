'use client';

import type { TocEntry } from '@/types/toc';
import { clsx } from 'clsx';
import { throttle } from 'es-toolkit';
import NextLink from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

const TOC_EPS = 50;

interface FlatTocEntry extends Omit<TocEntry, 'items'> {
  level: number;
}

const flattenToc = (toc: TocEntry[]) => {
  const result: FlatTocEntry[] = [];
  const extract = (entries: TocEntry[], level: number = 2) => {
    for (const entry of entries) {
      result.push({
        title: entry.title,
        url: entry.url,
        level,
      });
      if (entry.items.length !== 0) {
        extract(entry.items, level + 1);
      }
    }
  };
  extract(toc);
  return result;
};

const calcMargin = (level: number) => {
  if (level === 2) return 'ml-0';
  if (level === 3) return 'ml-3';
  if (level === 4) return 'ml-5';
  return 'ml-7';
};

export interface TocProps {
  toc: TocEntry[];
}

export const Toc = ({ toc }: TocProps) => {
  const flatToc = flattenToc(toc);

  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const tocItemsRef = useRef<[HTMLLIElement, HTMLElement][]>([]); // [item, target]

  const hasOngoingSyncRef = useRef(false);

  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const getTocItems = () => {
      if (!listRef.current) return;
      tocItemsRef.current = [];
      const links = Array.from(listRef.current.querySelectorAll('a'));

      for (const link of links) {
        const url = link.getAttribute('href');
        if (!url) continue;

        const target = document.getElementById(decodeURIComponent(url).slice(1));
        if (target) {
          const item = link.parentElement;
          if (item) {
            tocItemsRef.current.push([item as HTMLLIElement, target]);
          }
        }
      }
    };
    const getReadingProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (scrollableHeight === 0) {
        setReadingProgress(0);
      } else {
        setReadingProgress(Math.min(100, Math.round((currentScroll / scrollableHeight) * 100)));
      }
    };
    const syncCurrent = () => {
      if (
        !listRef.current
        || !navRef.current
        || tocItemsRef.current.length === 0
        || window.innerHeight === 0
      ) return;

      if (hasOngoingSyncRef.current) return;
      hasOngoingSyncRef.current = true;

      requestAnimationFrame(() => {
        let activeItem = null as HTMLLIElement | null;

        for (const [index, [item, target]] of tocItemsRef.current.entries()) {
          const targetBounds = target.getBoundingClientRect();
          const nextTargetBounds = tocItemsRef.current[index + 1]?.[1].getBoundingClientRect() as DOMRect | undefined;

          const targetBottom = nextTargetBounds ? nextTargetBounds.top : document.documentElement.scrollHeight;
          if (targetBottom > TOC_EPS && targetBounds.top <= window.innerHeight - TOC_EPS) {
            item.dataset.current = 'true';
            if (!activeItem) {
              activeItem = item;
            }
          } else {
            delete item.dataset.current;
          }
        }

        if (activeItem) {
          const navBounds = navRef.current!.getBoundingClientRect();
          const activeItemBounds = activeItem.getBoundingClientRect();

          if (activeItemBounds.top < navBounds.top || activeItemBounds.bottom > navBounds.bottom) {
            navRef.current!.scrollTo({
              top: navRef.current!.scrollTop + (activeItemBounds.top - navBounds.top) - (navBounds.height / 2) + (activeItemBounds.height / 2),
              behavior: 'smooth',
            });
          }
        }

        hasOngoingSyncRef.current = false;
      });
    };

    getTocItems();
    getReadingProgress();
    syncCurrent();

    const scrollHandler = throttle(() => {
      getReadingProgress();
      syncCurrent();
    }, 150);

    const controller = new AbortController();
    window.addEventListener('scroll', scrollHandler, {
      passive: true,
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, [toc]);

  return (
    <aside className='hidden w-0 xl:block'>
      <nav ref={navRef} className='sticky top-20 max-h-[75vh] w-md flex flex-col translate-x-5 gap-3 overflow-auto overscroll-contain px-2 text-sm text-muted-fg scrollbar-none'>
        <div className='flex items-center gap-3'>
          <Icon className='i-lucide-menu size-4' label='Table of Contents' />
          <span className='translate-y-1px text-sm'>{readingProgress}%</span>
        </div>
        <ul ref={listRef} className='flex flex-col gap-1 text-sm'>
          {flatToc.map(entry => (
            <li key={entry.url} className='h-6'>
              <NextLink href={entry.url} className={clsx(
                'flex items-center text-muted-fg transition-all duration-200 [[data-current]>&]:text-fg hover:text-fg',
                calcMargin(entry.level),
              )}
              >
                {entry.title}
              </NextLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
