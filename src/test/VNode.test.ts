import { Node } from '../lib/types'
import { createNode, VNode } from '../lib/VNode'

describe('VNode', () => {
  it('return VNode instance', () => {
    expect(createNode('')).toBeInstanceOf(VNode)
  })
  it('return correct VNode', () => {
    const tagName = 'test'
    const props: Node.Prop = { key: 'test', type: Node.PropType.String, value: '' }
    const node = createNode(tagName, props)
    expect(node.tagName).toEqual(tagName)
    expect(node.props).toEqual([props])
  })
  it('return correct nested string', () => {
    const node = createNode('template')
    node.insertChild(createNode('div'))
    expect(node.toString()).toMatchSnapshot()
  })
  it('remove node correctly', () => {
    const node = createNode('template')
    node.insertChild(createNode('div1'))
    node.insertChild(createNode('div2'))
    node.removeChild(0)
    expect(node.toString()).toMatchSnapshot()
  })
})
