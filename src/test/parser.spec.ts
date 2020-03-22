import parser from '../lib/parser'
import { SourceConfig } from '../lib/types'

describe('Parser test', () => {
  it('generate correct template string', () => {
    const input: SourceConfig = {
      query: [
        {
          tag: 'el-form',
          props: {
            inline: { type: 'boolean', value: '' },
            labelWidth: { type: 'string', value: '100px' }
          },
          children: [
            {
              tag: 'el-form-item',
              props: {
                required: { type: 'boolean', value: '' },
                label: { type: 'string', value: '100px' }
              },
              children: [
                {
                  tag: 'el-input',
                  props: {
                    type: { type: 'string', value: 'text' },
                    clearable: { type: 'boolean', value: '' }
                  },
                  children: []
                }
              ]
            }
          ]
        },
        {
          tag: 'el-form',
          props: {
            inline: { type: 'boolean', value: '' },
            labelWidth: { type: 'string', value: '100px' }
          },
          children: []
        }
      ],
      plain: []
    }
    const output = parser(input)
    expect(output).toMatchSnapshot()
  })
  it('throw error when invalid prop type given', () => {
    const input: SourceConfig = {
      query: [
        {
          tag: 'el-form',
          props: {
            inline: { type: 'invalidType', value: '' },
            labelWidth: { type: 'string', value: '100px' }
          },
          children: []
        }
      ],
      plain: []
    }
    const test = (): any => parser(input)
    expect(test).toThrowError(Error)
  })
})
