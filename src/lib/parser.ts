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
  return Object.values(source)
    .reduce(
      (r: VNode, confArr: Node.Config[]) => r.insertChild(confArr.map((conf: Node.Config) => makeNodeTree(conf))),
      createNode('div', { id: { type: Node.PropType.String, value: 'preview' } })
    )
    .toString()
}
