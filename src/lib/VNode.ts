import { Dictionary, VNodeType } from './types'

export class VNode {
  private type: VNodeType = VNodeType.Unknown
  private tagName: string = ''
  private prop: Dictionary<string> = {}
  private children: Array<VNode> | string = []

  constructor(tag: string, type: VNodeType, prop: Dictionary<string> = {}, children?: Array<VNode> | string) {
    this.type = type
    this.tagName = tag
    this.prop = prop
    if (children) {
      this.children = children
    }
  }
  private makeTagStr(prop?: string, children?: string): string {
    return `<${this.tagName}${prop}>${children}</${this.tagName}>`
  }
  private makePropStr(): string {
    const result = Object.keys(this.prop)
      .map(key => `${key}="${this.prop[key]}"`)
      .join(' ')
    return ' ' + result
  }
  private makeChildrenStr(): string {
    if (Array.isArray(this.children)) {
      return (this.children as Array<VNode>).reduce<string>((all: string, cur: VNode) => all + cur.toString(), '')
    } else {
      return this.children as string
    }
  }
  public toString(): string {
    return this.makeTagStr(this.makePropStr(), this.makeChildrenStr())
  }
  public insertChild(child: VNode | VNode[] | string): VNode {
    if (this.type === VNodeType.Element) {
      if (Array.isArray(child)) {
        ;(this.children as Array<VNode>).push(...(child as VNode[]))
      } else if (typeof child === 'string') {
        this.children = child as string
      } else {
        ;(this.children as Array<VNode>).push(child)
      }
    } else {
      this.children = child as string
    }
    return this
  }
  public removeChild(pos: number): VNode {
    if (this.type === VNodeType.Element) {
      ;(this.children as Array<VNode>).splice(pos, 1)
    } else {
      this.children = ''
    }
    this.children
    return this
  }
}

export function createElement(
  tag: string,
  type: VNodeType,
  prop: Dictionary<string> = {},
  children?: Array<VNode> | string
): VNode {
  return new VNode(tag, type, prop, children)
}
