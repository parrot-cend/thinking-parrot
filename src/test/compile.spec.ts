import fs from 'fs'
import parser from '../lib/parser'

it('generate correct template string', () => {
  const input = {
    queryForm: {
      formItem: [
        {
          model: 'searchContent',
          label: '搜索内容',
          tag: 'el-input',
          prop: {
            type: 'text'
          }
        }
      ],
      buttons: [
        {
          type: 'primary',
          size: 'small',
          text: 'Click me'
        }
      ]
    }
  }
  const output = parser(JSON.stringify(input))
  fs.writeFileSync('output.vue', output)
  expect(output).toMatchSnapshot()
})
