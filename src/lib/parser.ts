import { Node, SourceConfig } from './types'
import { createNode, VNode } from './VNode'

type TemplateCode = string

export default function parser(source: SourceConfig): TemplateCode {
  const makeNodeTree = (conf: Node.Config): VNode | string => {
    if (typeof conf === 'string') {
      return conf
    } else {
      const node = createNode(conf.tag, conf.props)
      if (conf.children?.length) {
        node.insertChild(conf.children.map((c: Node.Config) => makeNodeTree(c)))
      }
      return node
    }
  }
  return source
    .map((conf: Node.Config) => makeNodeTree(conf))
    .map((node: VNode | string) => {
      if (typeof node === 'string') {
        return node
      } else {
        return node.toString()
      }
    })
    .join('\n')
}
