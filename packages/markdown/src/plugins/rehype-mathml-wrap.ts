import type { Nodes, Root } from 'hast';
import { visit } from './utils/visit.ts';

function plugin(tree: Root) {
  visit<Nodes>(tree, (node, index, parent) => {
    if (node.type !== 'element' || node.tagName !== 'math') return;
    const wrapper = {
      type: 'element' as const,
      tagName: 'div',
      properties: {
        className: ['math-display'],
      },
      children: [node],
    };
    if (parent && index && (parent.type === 'root' || parent.type === 'element'))
      parent.children[index] = wrapper;
    return 'skip';
  });
}

export function rehypeMathMLWrap() {
  return plugin;
}
