import './init'
import express from 'express'
import { addStore, errorHandler, serverRenderer } from './middleware'
import { connectMongoDB } from './mongodb.connection'
import apiRoutes from './routes'
import { colorLog } from './utils'
import connectExpressModules from './modules'
import nconf from 'nconf'

const DEFAULT_PORT: number = 3000

connectMongoDB()

const app = express()
app.use(addStore)
app.use('/api', apiRoutes) // api routes

connectExpressModules(app)

app.use(serverRenderer())
app.use(errorHandler)

app.listen(process.env.PORT || DEFAULT_PORT, () => {
  colorLog(`App is running: http://localhost:${process.env.PORT}`, 'blue')
})

console.log(nconf.get())

export default app
