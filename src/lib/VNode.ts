import { formatByPrettier } from './formatter'
import { Dictionary, Node } from './types'

export interface VNodeOptions {
  props?: Dictionary<Node.Prop>
  children?: Array<VNode | string>
}

export class VNode {
  public tagName: string = ''
  public props: Partial<Dictionary<Node.Prop>>
  public children: Array<VNode | string> = []

  constructor(tag: string, props?: Dictionary<Node.Prop>) {
    this.tagName = tag
    this.props = props || {}
    return this
  }
  private makeTagStr(prop?: string, children?: string): string {
    return children ? `<${this.tagName}${prop}>${children}</${this.tagName}>` : `<${this.tagName}${prop} />`
  }
  private makePropStr(): string {
    const result = Object.keys(this.props)
    if (result.length > 0) {
      return (
        ' ' +
        result
          .map(key => {
            const realKey = /[A-Z]/.test(key) ? key.replace(/([A-Z])/g, '-$1') : key
            if (this.props[key]?.type === Node.PropType.String) {
              return `${realKey}="${this.props[key]?.value}"`
            } else if (this.props[key]?.type === Node.PropType.Boolean) {
              return !this.props[key]?.value ? realKey : `:${realKey}="${this.props[key]?.value || false}"`
            } else if (this.props[key]?.type === Node.PropType.Expression) {
              return `:${realKey}="${this.props[key]?.value}"`
            } else {
              throw new Error(`
                Invalid Prop Type. Node infomation below:\n
                tagName: ${this.tagName}\n
                props: ${JSON.stringify(this.props)}\n
                errorProp: key: ${JSON.stringify(this.props[key])}
              `)
            }
          })
          .join(' ')
      )
    } else {
      return ''
    }
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
  public insertChild(child: VNode | VNode[] | string | string[] | Array<VNode | string>): this {
    if (Array.isArray(child)) {
      this.children.push(...child)
    } else {
      this.children.push(child)
    }
    return this
  }
  public removeChild(pos: number): this {
    this.children.splice(pos, 1)
    return this
  }
}

export function createNode(tag: string, props?: Dictionary<Node.Prop>): VNode {
  return new VNode(tag, props)
}
