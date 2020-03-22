import { Node, SourceConfig } from './types'
import { createNode, VNode } from './VNode'

export default function parser(source: SourceConfig): string {
  const makeNodeTree = (node: Node.Config): VNode | string => {
    if (typeof node === 'string') {
      return node
    } else {
      const current = createNode(node.tag, node.props)
      if (node.children?.length) {
        current.insertChild(node.children.map(c => makeNodeTree(c)))
      }
      return current
    }
  }
  return Object.keys(source)
    .reduce((root, key) => root.insertChild(source[key].map(config => makeNodeTree(config))), createNode('template'))
    .toString()
}
