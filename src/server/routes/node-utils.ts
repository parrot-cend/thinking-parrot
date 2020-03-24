import fs from 'fs'
import { Context, Next } from 'koa'
import path from 'path'

export async function get(ctx: Context, next: Next): Promise<void> {
  const scriptPath = path.resolve('scripts', 'script.js')
  const content = fs.readFileSync(scriptPath, 'utf-8')
  ctx.set('Content-Type', 'application/javascript')
  ctx.body = content
  await next()
}
