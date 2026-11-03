import type { Nodes, Root } from 'hast';
import Slugger from 'github-slugger';
import { getValue } from './utils/get-value.ts';
import { visit } from './utils/visit.ts';

export interface TocItem {
  value: string;
  label: string;
  depth: 1 | 2 | 3 | 4 | 5 | 6;
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

      const depth = Number(node.tagName[1]) as 1 | 2 | 3 | 4 | 5 | 6;

      const content = getValue(node);
      const slug = slugger.slug(content);
      node.properties.id = slug;
      node.properties['data-depth'] = depth;

      node.children.push({
        type: 'element',
        tagName: 'a',
        properties: {
          className: ['heading-anchor'],
          'aria-hidden': 'true',
          tabindex: '-1',
          href: `#${slug}`,
        },
        children: [],
      });

      toc.push({
        value: slug,
        label: content,
        depth,
      });
    });
  };
}
