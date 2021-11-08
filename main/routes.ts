import * as pages from './pages'

export const routes = [
  {
    path: '/',
    exact: true,
    component: pages.Home
  },
  {
    path: '/snippets',
    exact: true,
    component: pages.Snippets
  },
  {
    path: '/sign-in',
    exact: true,
    component: pages.PSignIn
  },
  {
    path: '/sign-up',
    exact: true,
    component: pages.PSignUp
  },
  {
    path: '/collections',
    exact: true,
    component: pages.Collections
  }
]