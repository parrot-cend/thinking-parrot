import ElementContext from './ElementContext'

function templateCompiler(options: any): string {
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

export const compile = (options: any): string => {
  return templateCompiler(options)
}
