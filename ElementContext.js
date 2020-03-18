class ElementContext {
  constructor(tag, options = {}) {
    const properties = Object.keys(options).map(key => `${key}=\"${options[key]}\"`).join(' ')
    const propertiesStr = properties ? ' ' + properties : ''
    this.result = `<${tag}${propertiesStr}>{slot}</${tag}>`
  }
  toString() {
    return this.result.replace(/\{slot\}/g, '')
  }
  insert(context) {
    // TODO: 计算缩进层级, 优化代码美观度
    if (context instanceof ElementContext) {
      this.result = this.result.replace('{slot}', `\n${context.result}\n`)
    } else if (typeof context === 'string') {
      this.result = this.result.replace('{slot}', `\n${context}\n`)
    } else {
      throw new Error('Only can insert string or ElementContext instance')
    }
    return this
  }
}

module.exports = ElementContext