import fs from 'fs'
import { Context, Next } from 'koa'
import path from 'path'

export async function get(ctx: Context, next: Next): Promise<void> {
  const scriptPath = path.join(__dirname, '../..', 'lib', 'nodeUtils.ts')
  const typePath = path.join(__dirname, '../..', 'lib', 'types.ts')
  const scriptContent = fs.readFileSync(scriptPath, 'utf-8')
  const typeContent = fs.readFileSync(typePath, 'utf-8')
  ctx.body = [
    {
      name: 'nodeUtils.ts',
      content: scriptContent
    },
    {
      name: 'types.ts',
      content: typeContent
    }
  ]
  await next()
}
