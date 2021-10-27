import * as React from 'react'
import * as express from 'express'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { HelmetProvider } from 'react-helmet-async'
import IntlProvider from '../../main/i18n/IntlProvider'
import App from '../../main/App'
import Html from '../components/HTML'
import theme from '../../Root/theme'
import MDXWrapper from '../../packages/mdx'

const helmetContext = {}
const routerContext = {}

const serverRenderer: any = () => (
  req: express.Request & { store: Store },
  res: express.Response
) => {
  const content = renderToString(
    <Provider store={res.locals.store}>
      <MDXWrapper>
        <Router location={req.url} context={routerContext}>
          <IntlProvider>
            <HelmetProvider context={helmetContext}>
              <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <App />
              </ChakraProvider>
            </HelmetProvider>
          </IntlProvider>
        </Router>
      </MDXWrapper>
    </Provider>
  )

  const state = JSON.stringify(res.locals.store.getState())

  return res.send(
    '<!doctype html>' +
      renderToString(
        <Html
          css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
          helmetContext={helmetContext}
          scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
          state={state}
        >
          {content}
        </Html>
      )
  )
}

export default serverRenderer
