import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'

function compileNodeUtils(): void {
  console.log('Compile nodeUtils files ...')
  const compiler = path.join(__dirname, '..', '..', 'node_modules', 'typescript', 'bin', 'tsc')
  const sourcePath = path.join(__dirname, '..', 'lib', 'nodeUtils.ts')
  const options = [
    '--module UMD',
    `--outDir ${path.join(__dirname, 'dist/')}`,
    '--removeComments',
    '--skipLibCheck',
    '-t ES5',
    '--newLine LF'
  ].join(' ')
  execSync(`${compiler} ${sourcePath} ${options}`)
  console.log('Compile finish.')
}

export default function checkOutputScript(): void {
  if (!fs.existsSync(path.join(__dirname, 'dist')) || process.argv.includes('--update')) {
    compileNodeUtils()
  }
}
