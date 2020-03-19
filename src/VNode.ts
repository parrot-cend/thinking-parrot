import { Dictionary } from '@/utils/types'

class VNode {
  private result: string
  constructor(tag: string, options: Dictionary<string> = {}) {
    const properties = Object.keys(options)
      .map(key => `${key}=\"${options[key]}\"`)
      .join(' ')
    const propertiesStr = properties ? ' ' + properties : ''
    this.result = `<${tag}${propertiesStr}>{slot}</${tag}>`
  }
  public toString(): string {
    return this.result.replace(/\{slot\}/g, '')
  }
  public insert(context: VNode | string): VNode {
    // TODO: 计算缩进层级, 优化代码美观度
    if (context instanceof VNode) {
      this.result = this.result.replace('{slot}', `\n${context.result}\n`)
    } else if (typeof context === 'string') {
      this.result = this.result.replace('{slot}', `\n${context}\n`)
    } else {
      throw new Error('Only can insert string or VNode instance')
    }
    return this
  }
}

export function createElement(tag: string, options?: Dictionary<string>): VNode {
  return new VNode(tag, options)
}
