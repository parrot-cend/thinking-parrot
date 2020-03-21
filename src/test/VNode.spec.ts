import { createElement, VNode } from '../lib/VNode'

test('should return VNode instance', () => {
  expect(createElement('')).toBeInstanceOf(VNode)
})
