import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './rootReducer'
import logger from 'redux-logger';
import rootSaga from './rootSaga'

type StoreParams = {
  initialState?: { [key: string]: any }
  middleware?: any[]
}

export const configureStore = ({ initialState, middleware = [] }: StoreParams) => {
  const sagaMiddleware = createSagaMiddleware();

  const devtools =
    typeof window !== 'undefined' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] })

  const composeEnhancers = devtools || compose

  const _middlewares = [
    ...middleware,
    sagaMiddleware
  ]

  // if (process.env.NODE_ENV === 'development') {
  //   _middlewares.push(logger);
  // }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...[thunk].concat(..._middlewares)))
  )

  sagaMiddleware.run(rootSaga)

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./rootReducer', () =>
        store.replaceReducer(require('./rootReducer').default)
      )
    }
  }

  return store
}

export default configureStore
