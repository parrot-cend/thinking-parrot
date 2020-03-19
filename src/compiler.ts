import { createElement } from './VNode'

export default function templateCompiler(options: any): string {
  const queryForm = options.queryForm
  const template = createElement('template')
  const formContext = createElement('el-form')
  const formItems = Object.keys(queryForm).map(key => {
    const formItemOptions = {
      prop: key,
      label: queryForm[key].label
    }
    const elFormItem = createElement('el-form-item', formItemOptions)
    const itemContent = createElement('el-input', queryForm[key].options)
    return elFormItem.insert(itemContent).toString()
  })
  return template
    .insert(formContext)
    .insert(formItems.join('\n'))
    .toString()
}
