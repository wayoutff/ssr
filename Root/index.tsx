import * as React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { configureStore } from '../main/store'
import App from '../main/App'
import IntlProvider from '../main/i18n/IntlProvider'
import createHistory from '../main/store/history'
import theme from './theme'
import MDXWrapper from '../packages/mdx'

const history = createHistory()

// Create/use the store
// history MUST be passed here if you want syncing between server on initial route
const store =
  window.store ||
  configureStore({
    initialState: window.__PRELOADED_STATE__
  })

hydrate(
  <Provider store={store}>
    <MDXWrapper>
      <Router history={history}>
        <IntlProvider>
          <HelmetProvider>
            <ChakraProvider theme={theme}>
              <ColorModeScript initialColorMode={theme.config.initialColorMode} />
              <App />
            </ChakraProvider>
          </HelmetProvider>
        </IntlProvider>
      </Router>
    </MDXWrapper>
  </Provider>,
  document.getElementById('app')
)

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept()
  }

  if (!window.store) {
    window.store = store
  }
}
