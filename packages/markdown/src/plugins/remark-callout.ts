import type { Nodes, Root } from 'mdast';
import { visit } from './utils/visit.ts';

const calloutList = new Set(['info', 'warning', 'danger', 'success', 'summary']);

function plugin(tree: Root) {
  visit<Nodes>(tree, node => {
    if (node.type !== 'containerDirective' || !calloutList.has(node.name)) return;

    node.data ||= {};
    node.data.hName = 'div';
    node.data.hProperties = {
      'data-callout': node.name,
      className: `callout ${node.attributes?.className ?? ''}`,
      ...node.attributes,
    };

    for (const child of node.children) {
      if (child.type === 'paragraph' && child.data?.directiveLabel) {
        child.data ||= {};
        child.data.hProperties = { className: 'callout-desc' };
      }
    }
  });
}

export function remarkCallout() {
  return plugin;
}
