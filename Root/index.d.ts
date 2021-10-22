import { compose } from 'redux'

interface Window {
  browserHistory: any
  store: any
  __PRELOADED_STATE__: any
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
}

declare module 'express-manifest-helpers'