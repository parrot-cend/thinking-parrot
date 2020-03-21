import parser from '@/lib/parser'
import { Context, Next } from 'koa'

export async function get(ctx: Context, next: Next): Promise<void> {
  const sourceStr: string = JSON.stringify(ctx.request.body.data)
  const result = parser(sourceStr)
  ctx.set('Content-Type', 'plain/text')
  ctx.body = result
  await next()
}
