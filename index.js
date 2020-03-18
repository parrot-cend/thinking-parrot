// TODO: 将源 json 编译为 template 输出

const fs = require('fs')
const path = require('path')
const compile = require('./compiler')
const source = JSON.parse(fs.readFileSync('source.json'))

const result = compile(source)
const targetFile = path.join(__dirname, 'target.vue')
fs.writeFileSync(targetFile, result)