export type Locale = 'en_US' | 'de_DE'

export type AppState = Readonly<{
  locale: Locale | string,
  count: number,
  currentUser: any,
  error: string
}>

export type Action = {
  type: string
  payload: any
}

export const UserActionTypes = {
  EMAIL_SIGN_IN_START: 'EMAIL_SIGN_IN_START',
  GOOGLE_SIGN_IN_START: 'GOOGLE_SIGN_IN_START',
  FACEBOOK_SIGN_IN_START: 'FACEBOOK_SIGN_IN_START',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
  CHECK_USER_SESSION: 'CHECK_USER_SESSION',
  SIGN_OUT_START: 'SIGN_OUT_START',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',
  SIGN_UP_START: 'SIGN_UP_START',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',
};
