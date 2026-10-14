export function visit<Node extends { type: string; children?: Node[] }>(
  node: Node,
  visitor: (node: Node, index?: number)=> 'skip' | undefined,
  index?: number,
) {
  const result = visitor(node, index);
  if (result === 'skip' || !node.children) return;
  for (let i = 0; i < node.children.length; ++i) {
    visit(node.children[i]!, visitor, i);
  }
}
