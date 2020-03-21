import { ButtonSchema, FormItemSchema, OptionsSchema } from './types'
import { createElement, VNode } from './VNode'

function formItemParser(formItem: FormItemSchema): VNode {
  const prop = formItem.prop || {}
  return createElement(formItem.tag, { prop })
}
function buttonParser(button: ButtonSchema): VNode {
  const prop = {
    size: button.size,
    type: button.type
  }
  return createElement('el-button', { prop })
}

export default function parser(source: string): string {
  const root = createElement('template')
  const form = createElement('el-form')
  root.insertChild(form)
  let sourceObj: OptionsSchema
  try {
    sourceObj = JSON.parse(source)
  } catch (e) {
    throw new Error('invalid source json')
  }
  if (sourceObj) {
    Object.keys(sourceObj).map(key => {
      const formItem = createElement('el-form-item')
      const formItemNodes = sourceObj[key].formItem.map(item => formItemParser(item))
      formItem.insertChild(formItemNodes)
      const buttonNodes = sourceObj[key].buttons.map(button => buttonParser(button))
      form.insertChild(formItem).insertChild(buttonNodes)
    })
  }
  return root.toString()
}
