// import React, { Suspense } from 'react';
import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, Route, Switch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import favicon from './assets/favicon.png'

import css from './App.module.css'

import { routes } from './routes'
import Layout from './Layout'

// Does not yet work with server side rendering:
// const Home = React.lazy(() => import('./pages/Home'));
// const Page1 = React.lazy(() => import('./pages/Page-1'));
// const Page2 = React.lazy(() => import('./pages/Page-2'));

const App: React.FC<any> = () => {
  const { t } = useTranslation()
  return (
    // <Suspense fallback={<div>Loading</div>}>
    <div className={css.wrapper}>
      <Helmet
        defaultTitle="meRRn - TypeScript"
        titleTemplate="%s – meRRn - TypeScript"
        link={[{ rel: 'icon', type: 'image/png', href: favicon }]}
      />
      <Layout>
        <Switch>
          {routes?.length && routes.map(route => {
            return (
              <Route
                key={route.path}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            )
          })}
          <Route render={() => '404!'} />
        </Switch>
      </Layout>
    </div>
    // </Suspense>
  )
}

export default App
