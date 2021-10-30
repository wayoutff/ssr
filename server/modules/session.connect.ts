import session from 'express-session'

import redis from 'redis'

import connectRedis from 'connect-redis'
import { colorLog } from '../utils'

const redisClient = redis.createClient()

const RedisStore = connectRedis(session)

redisClient.on('error', (err) => {
  colorLog('Could not establish a connection with redis. ' + err, 'red')
})
redisClient.on('connect', (err) => {
  colorLog('Connected to redis successfully', 'blue')
})

export default function connectSession (app) {
  app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie 
      maxAge: 1000 * 60 * 60 * 24 * 30 // session max age in miliseconds === 30 days
    }
  }))
}
