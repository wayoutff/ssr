/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect'
import { AppState, Locale } from './types'

export const app = (state: { app: AppState }): AppState => state.app

export const getLocale = createSelector([app], (app): Locale => app.locale)

export const getCounter = createSelector([app], (app): number => app.count)

export const getUser = createSelector([app], (app): any => app.currentUser)