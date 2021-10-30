import passport from 'passport'
import authRoutes from './routes'

export default function initAuth (app) {
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/auth', authRoutes)
}