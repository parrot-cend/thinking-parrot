import fs from 'fs'
import path from 'path'
import parser from '../lib/parser'
import source from './source.json'

// const sourcePath = path.resolve(__dirname, 'source.json')
// const source = JSON.parse(fs.readFileSync(sourcePath).toString())
const result = parser(JSON.stringify(source))
const targetFile = path.join(__dirname, 'target.vue')
fs.writeFileSync(targetFile, result)
