import { formatByPrettier } from './formatter'
import { Dictionary } from './types'

interface VNodeOptions {
  prop?: Dictionary<string>
  children?: Array<VNode | string>
}

export class VNode {
  private tagName: string = ''
  private prop: Dictionary<string>
  private children: Array<VNode | string>

  constructor(tag: string, options?: VNodeOptions) {
    this.tagName = tag
    this.prop = options?.prop || {}
    this.children = options?.children || []
  }
  private makeTagStr(prop?: string, children?: string): string {
    return `<${this.tagName}${prop}>${children}</${this.tagName}>`
  }
  private makePropStr(): string {
    const result = Object.keys(this.prop)
      .map(key => `${key}="${this.prop[key]}"`)
      .join(' ')
    return result ? ' ' + result : ''
  }
  private makeChildrenStr(): string {
    return this.children.reduce<string>((all: string, cur: VNode | string) => {
      if (typeof cur === 'string') {
        return all + cur
      } else {
        return all + cur.toString()
      }
    }, '')
  }
  public toString(inline?: boolean): string {
    const result = this.makeTagStr(this.makePropStr(), this.makeChildrenStr())
    if (inline) {
      return result
    } else {
      return formatByPrettier(result)
    }
  }
  public insertChild(child: VNode | VNode[] | string, pos?: number): VNode {
    if (pos) {
      if (Array.isArray(child)) {
        this.children.splice(pos, 0, ...child)
      } else {
        this.children.splice(pos, 0, child)
      }
    } else {
      if (Array.isArray(child)) {
        this.children.push(...child)
      } else {
        this.children.push(child)
      }
    }
    return this
  }
  public removeChild(pos: number): VNode {
    this.children.splice(pos, 1)
    return this
  }
}

export function createElement(tag: string, options?: VNodeOptions): VNode {
  return new VNode(tag, options)
}
