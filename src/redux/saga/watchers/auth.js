import {takeLatest} from 'redux-saga/effects';

import {FACEBOOK_LOGIN, GOOGLE_LOGIN, LOGIN, SEND_OTP, SIGNUP, VERIFY_OTP} from '../../reduxConstants';

import {googleLoginWorker, userLoginAuth, userSignupAuth, facebookLoginWorker, sendOtpWorker, verifyOtpWorker} from './../workers/auth';

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

export function* watchSendOtp() {
  yield takeLatest(SEND_OTP, sendOtpWorker);
}

export function* watchVerifyOtp() {
  yield takeLatest(VERIFY_OTP, verifyOtpWorker);
}

