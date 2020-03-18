const ElementContext = require('./ElementContext')

const RootType = {
  Template: 'template',
  Script: 'script'
}

const FormItemType = {
  input: 'input'
}

function makeFormItemContext(type, options) {
  if (type in FormItemType) {
    return new ElementContext(type, options)
  } else {
    throw new Error('unknown FormItemType')
  }
}

function templateCompiler(options) {
  const queryForm = options.queryForm
  const template = new ElementContext('template')
  const formContext = new ElementContext('el-form')
  const formItems = Object.keys(queryForm).map(key => {
    const formItemOptions = {
      prop: key,
      label: queryForm[key].label
    }
    const elFormItem = new ElementContext('el-form-item', formItemOptions)
    const itemContent = new ElementContext('el-input', queryForm[key].options)
    return elFormItem.insert(itemContent).toString()
  })
  return template
          .insert(formContext)
          .insert(formItems.join('\n'))
          .toString()
}

module.exports = (options) => {
  return templateCompiler(options)
}