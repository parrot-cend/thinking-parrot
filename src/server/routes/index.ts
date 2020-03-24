import { Dictionary } from '@/lib/types'
import { Context, Next } from 'koa'
import * as config from './config'
import * as nodeUtils from './node-utils'

const routes: Dictionary = {
  '/config': {
    POST: config.post
  },
  '/node': {
    GET: nodeUtils.get
  }
}

export default async function router(ctx: Context, next: Next): Promise<void> {
  const route = routes[ctx.path]
  if (route) {
    const handler = route[ctx.method.toUpperCase()]
    if (handler) {
      await handler(ctx, next)
    } else {
      ctx.status = 405
      await next()
    }
  } else {
    ctx.status = 404
    await next()
  }
}
