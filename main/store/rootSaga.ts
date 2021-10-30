// user.saga.js

import { call, takeLatest, all, put } from 'redux-saga/effects';
import axios from 'axios';

import { UserActionTypes } from './app/types';
import {
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  signUpSuccess,
  signUpFailure,
} from './app/actions';

//sign in 
export function* emailSignInAsync({ payload: { email, password, history } }) {
  try {
    const response = yield axios({
      method: 'post',
      url: '/auth/login',
      data: {
        email,
        password,
      },
      withCredentials: true,
    });
    yield put(signInSuccess(response.data.user));
    history.push('/secrets');
  } catch (error) {
    yield put(signInFailure(error.response.data.error));
    history.push('/');
  }
}

//sign up
export function* signUpAsync({ payload: { email, password, history } }) {
  try {
    const response = yield axios({
      method: 'post',
      url: '/auth/signup',
      data: {
        email,
        password,
      },
      withCredentials: true,
    });
    yield put(signUpSuccess(response.data.user));
    history.push('/secrets');
  } catch (error) {
    yield put(signUpFailure(error.response.data.error));
    history.push('/');
  }
}

//sign out
export function* signOutAsync({ payload: { history } }) {
  try {
    const response = yield axios.get('/auth/logout', {
      withCredentials: true,
    });
    console.log(response.data, 'response.data')
    yield put(signOutSuccess());
    // history.push('/');
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

//check authentication
export function* isUserAuthenticated() {
  try {
    console.log('a>>')
    const response = yield axios.get('/auth/login_check', {
      withCredentials: true,
    });
    console.log(response, 'asd')
    yield put(signInSuccess(response.data));
  } catch (error) {
    yield put(signInFailure(error.response.data.error));
  }
}

//---------------------------------watcher----------------------------------

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, emailSignInAsync);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutAsync);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUpAsync);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onCheckUserSession),
    call(onSignUpStart),
  ]);
}