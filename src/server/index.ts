import Koa from 'koa'
import * as mdr from './middleware'
import applyRouter from './routes'

const app = new Koa()
const PORT = 3000

app.use(mdr.timer)
app.use(mdr.bodyParser)
applyRouter(app)
app.use(mdr.logger)

const server = app.listen(PORT)
console.log(`Server listening in port:${PORT}`)

export default server
