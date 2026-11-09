export function visit<Node extends { type: string; children?: Node[] }>(
  node: Node,
  visitor: (node: Node, index?: number, parent?: Node) => 'skip' | undefined,
  index?: number,
  parent?: Node,
) {
  const result = visitor(node, index, parent);
  if (result === 'skip' || !node.children) return;
  for (let i = 0; i < node.children.length; ++i) {
    visit(node.children[i]!, visitor, i, node);
  }
}
