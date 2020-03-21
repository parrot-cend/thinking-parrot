import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import * as mdr from './middleware'
import applyRouter from './routes'

const app = new Koa()
const PORT = 3000

app.use(mdr.timer)
app.use(bodyParser())
applyRouter(app)
app.use(mdr.logger)

app.listen(PORT)
console.log(`Server listening in port:${PORT}`)
