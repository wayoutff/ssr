import path from 'path'
import express from 'express'
import manifestHelpers from 'express-manifest-helpers'
import cors from 'cors'
import bodyParser from 'body-parser'
import paths from '../../config/paths'
import connectSession from './session.connect'

export default function connectExpressModules (app) {

  // Use Nginx or Apache to serve static assets in production
  // or remove the if() around the following
  // lines to use the express.static middleware to serve assets
  // for production (not recommended!)
  // if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line max-len
  app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)))
  // }

  connectSession(app)

  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  const manifestPath = path.join(paths.clientBuild, paths.publicPath)

  app.use(
    manifestHelpers({
      manifestPath: `${manifestPath}/manifest.json`
    })
  )
  
}