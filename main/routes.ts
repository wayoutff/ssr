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
  }
]