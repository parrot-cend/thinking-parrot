import Koa, { Context, Next } from 'koa'
import * as config from './config'

const routes = [
  {
    method: 'POST',
    path: 'config',
    fn: config.post
  }
]

export default function applyRouter(app: Koa): void {
  routes.forEach(route =>
    app.use(async (ctx: Context, next: Next) => {
      if (ctx.method.toUpperCase() === route.method.toUpperCase()) {
        await route.fn(ctx, next)
      } else {
        ctx.status = 405
        await next()
      }
    })
  )
}
