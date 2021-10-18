import { Locale } from './types'

export const ActionTypes = {
  SETLOCALE: 'app/set-locale',
  INC: 'app/INC'
}

export const setLocale = (locale: Locale) => ({
  type: ActionTypes.SETLOCALE,
  payload: locale
})

export const counterIncrement = () => ({
  type: ActionTypes.INC,
  payload: 1
})
