import Koa from 'koa'
import * as template from './template'

const routes = [
  {
    method: 'get',
    path: 'template',
    fn: template.get
  }
]

export default function applyRouter(app: Koa): void {
  routes.forEach(route => app.use(route.fn))
}
