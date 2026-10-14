import type { Nodes, Root } from 'hast';
import Slugger from 'github-slugger';
import { getValue } from './utils/get-value.ts';
import { visit } from './utils/visit.ts';

export interface TocItem {
  slug: string;
  step: 1 | 2 | 3 | 4 | 5 | 6;
}

const slugger = new Slugger();

export function rehypeHeading(toc: TocItem[]) {
  return function plugin(tree: Root) {
    slugger.reset();

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
  };
}
