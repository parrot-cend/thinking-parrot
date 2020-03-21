import fs from 'fs'
import { Context, Next } from 'koa'
import path from 'path'

export async function logger(ctx: Context, next: Next): Promise<void> {
  const logDirPath = path.resolve(__dirname, 'log')
  const logFilePath = path.resolve(__dirname, 'log', 'log.txt')
  const content = `${ctx.method.toUpperCase()} ${ctx.path} ${ctx.status}`
  if (!fs.existsSync(logDirPath)) {
    fs.mkdirSync(logDirPath)
  }
  fs.writeFileSync(logFilePath, content)
  await next()
}
