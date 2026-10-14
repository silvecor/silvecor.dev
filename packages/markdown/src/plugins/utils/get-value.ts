import type { RootContent } from 'hast';

export function getValue(node: RootContent): string {
  if ('children' in node) return node.children.map(getValue).join('');
  if ('value' in node) return node.value;
  return '';
}
