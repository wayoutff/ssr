import * as pages from './pages'

export const routes = [
  {
    path: '/',
    exact: true,
    component: pages.Home
  },
  {
    path: '/page-1',
    exact: true,
    component: pages.Page
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
  }
]