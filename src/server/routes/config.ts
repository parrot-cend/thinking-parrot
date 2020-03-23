import parser from '@/lib/parser'
import { Context, Next } from 'koa'

export async function post(ctx: Context, next: Next): Promise<void> {
  const result = parser(ctx.request.body.config)
  ctx.set('Content-Type', 'plain/text')
  ctx.body = result
  await next()
}
