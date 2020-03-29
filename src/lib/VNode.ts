import { formatByPrettier } from './formatter'
import { Dictionary, Node } from './types'

export interface VNodeOptions {
  props?: Dictionary<Node.Prop>
  children?: Array<VNode>
}

export class VNode {
  public tagName: string = ''
  public props: Array<Node.Prop>
  public children: Array<VNode> = []

  constructor(tag: string, props?: Array<Node.Prop> | Node.Prop) {
    this.tagName = tag
    if (props) {
      this.props = Array.isArray(props) ? props : [props]
    } else {
      this.props = []
    }
    return this
  }
  private makeTagStr(prop?: string, children?: string): string {
    return children?.length ? `<${this.tagName}${prop}>${children}</${this.tagName}>` : `<${this.tagName}${prop} />`
  }
  private makePropStr(): string {
    if (this.props.length > 0) {
      return (
        ' ' +
        this.props
          .map(prop => {
            const realKey = /[a-z][A-Z]/.test(prop.key) ? prop.key.replace(/([A-Z])/g, '-$1').toLowerCase() : prop.key
            if (prop.type === Node.PropType.String) {
              return `${realKey}="${prop.value}"`
            } else if (prop.type === Node.PropType.Boolean) {
              return !prop.value ? realKey : `:${realKey}="${prop.value || false}"`
            } else if (prop.type === Node.PropType.Expression) {
              return `:${realKey}="${prop.value}"`
            } else {
              throw new Error(`
                Invalid Prop Type. Node infomation below:\n
                tagName: ${this.tagName}\n
                props: ${JSON.stringify(this.props)}\n
                errorProp: key: ${JSON.stringify(this.props)}
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
    return this.children.reduce<string>((all: string, cur: VNode) => {
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
  public insertChild(child: VNode | Array<VNode>): this {
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

export function createNode(tag: string, props?: Array<Node.Prop> | Node.Prop): VNode {
  return new VNode(tag, props)
}
