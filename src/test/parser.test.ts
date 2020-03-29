import parser from '../lib/parser'
import { SourceConfig } from '../lib/types'

describe('Parser test', () => {
  it('generate correct template string', () => {
    const input: SourceConfig = [
      {
        tag: 'el-form',
        props: [
          { key: 'inline', type: 'boolean', value: '' },
          { key: 'labelWidth', type: 'string', value: '100px' }
        ],
        children: [
          {
            tag: 'el-form-item',
            props: [
              { key: 'required', type: 'boolean', value: '' },
              { key: 'label', type: 'string', value: '' }
            ],
            children: [
              {
                tag: 'el-input',
                props: [
                  { key: 'type', type: 'string', value: 'text' },
                  { key: 'bind', type: 'expression', value: 'text' },
                  { key: 'type', type: 'string', value: 'text' },
                  { key: 'clearable', type: 'boolean', value: '' }
                ],
                children: []
              }
            ]
          }
        ]
      },
      {
        tag: 'el-form',
        props: [
          { key: 'inline', type: 'boolean', value: 'false' },
          { key: 'labelWidth', type: 'string', value: '100px' }
        ],
        children: []
      }
    ]
    const output = parser(input)
    expect(output).toMatchSnapshot()
  })
  it('throw error when invalid prop type given', () => {
    const input: SourceConfig = [
      {
        tag: 'el-form',
        props: [
          { key: 'inline', type: 'invalidType', value: '' },
          { key: 'labelWidth', type: 'string', value: '100px' }
        ],
        children: []
      }
    ]
    const test = (): any => parser(input)
    expect(test).toThrowError(Error)
  })
})
