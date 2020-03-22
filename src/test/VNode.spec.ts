import { createNode, VNode } from '../lib/VNode'

describe('VNode', () => {
  it('return VNode instance', () => {
    expect(createNode('')).toBeInstanceOf(VNode)
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
