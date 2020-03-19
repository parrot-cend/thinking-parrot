// TODO: 将源 json 编译为 template 输出

import fs from 'fs'
import path from 'path'
import compile from './compiler'

const source = JSON.parse(fs.readFileSync('source.json').toString())

const result = compile(source)
const targetFile = path.join(__dirname, 'target.vue')
fs.writeFileSync(targetFile, result)
