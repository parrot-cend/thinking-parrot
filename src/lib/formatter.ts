import prettier from 'prettier'

export function formatByPrettier(str: string): string {
  return prettier.format(str, {
    parser: 'vue',
    semi: false,
    bracketSpacing: true,
    htmlWhitespaceSensitivity: 'ignore',
    endOfLine: 'lf'
  })
}
