import {takeLatest} from 'redux-saga/effects';

import {FACEBOOK_LOGIN, GOOGLE_LOGIN, LOGIN, SIGNUP} from '../../reduxConstants';

import {googleLoginWorker, userLoginAuth, userSignupAuth, facebookLoginWorker} from './../workers/auth';

export function* watchLoginUser() {
  yield takeLatest(LOGIN, userLoginAuth);
}

export function* watchSignup() {
  yield takeLatest(SIGNUP, userSignupAuth);
}

export function* watchGoogleLogin() {
  yield takeLatest(GOOGLE_LOGIN, googleLoginWorker);
}

export function* watchFacebookLogin() {
  yield takeLatest(FACEBOOK_LOGIN, facebookLoginWorker);
}


