import prettier from 'prettier'

export function formatByPrettier(str: string): string {
  return prettier.format(str)
}
