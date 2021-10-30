import './init'
import express from 'express'
import passport from 'passport'
import { addStore, errorHandler, serverRenderer } from './middleware'
import { connectMongoDB } from './mongodb.connection'
import apiRoutes from './routes'
import { colorLog } from './utils'
import bodyParser from 'body-parser'
import connectExpressModules from './modules'
import nconf from 'nconf'
import initAuth  from '../packages/auth/server'
const DEFAULT_PORT: number = 3000
connectMongoDB()

const app = express()
import '../packages/auth/server/config'

connectExpressModules(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(addStore)
initAuth(app)

app.use('/api', apiRoutes)
app.use(serverRenderer())
// app.use(errorHandler)

// app.use(function (error, req, res, next) {
//   res.status(error.status || 500).send({
//     error: {
//       status: error.status || 500,
//       message: error.message || 'Internal Server Error',
//     },
//   });
// });
app.listen(process.env.PORT || DEFAULT_PORT, () => {
  colorLog(`App is running: http://localhost:${process.env.PORT}`, 'blue')
})

export default app
