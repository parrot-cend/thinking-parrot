export interface Dictionary<T = any> {
  [index: string]: T
}

export enum VNodeType {
  Element = 'element',
  Text = 'text',
  Unknown = 'unknown'
}

export interface FormItemSchema {
  model?: string
  label?: string
  tag: string
  prop?: Dictionary<string>
}

export interface ButtonSchema {
  type: string
  size: string
  text: string
}

export interface FormSchema {
  formItem: Array<FormItemSchema>
  buttons: Array<ButtonSchema>
}

export interface OptionsSchema extends Dictionary<FormSchema> {
  queryForm: FormSchema
  // displayForm: FormSchema
  // submitForm: FormSchema
}
