import type { Nodes, Root } from 'hast';
import type { VFile } from 'vfile';
import Slugger from 'github-slugger';
import { getValue } from './get-value';
import { visit } from './visit';

interface TocItem {
  slug: string;
  step: 1 | 2 | 3 | 4 | 5 | 6;
}
declare module 'vfile' {
  interface DataMap {
    toc?: TocItem[];
  }
}

const slugger = new Slugger();

function plugin(tree: Root, file: VFile) {
  slugger.reset();
  const toc: TocItem[] = [];

  visit<Nodes>(tree, node => {
    if (
      node.type !== 'element'
      || node.properties.id
      || !/^h[1-6]$/.test(node.tagName)
    ) return;

    const slug = slugger.slug(getValue(node));
    node.properties.id = slug;

    node.children.push({
      type: 'element',
      tagName: 'a',
      properties: {
        'aria-hidden': 'true',
        tabindex: '-1',
        href: `#${slug}`,
      },
      children: [{
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['icon-heading'],
        },
        children: [],
      }],
    });

    toc.push({ slug, step: Number(node.tagName[1]) as any });
  });

  file.data.toc = toc;
}

export function rehypeHeading() {
  return plugin;
}
