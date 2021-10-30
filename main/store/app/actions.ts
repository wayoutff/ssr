import { Locale, UserActionTypes } from './types'

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

export const emailSignInStart = (userCredentials) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signOutStart = (history) => ({
  type: UserActionTypes.SIGN_OUT_START,
  payload: history,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = (user) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: user,
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});