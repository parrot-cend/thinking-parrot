import { Node, SourceConfig } from './types'
import { createNode, VNode } from './VNode'

type TemplateCode = string

export default function parser(source: SourceConfig): TemplateCode {
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
  return Object.values(source)
    .reduce((r, conf) => r.insertChild(conf.map(childConf => makeNodeTree(childConf))), createNode('template'))
    .toString()
}
