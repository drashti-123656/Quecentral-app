import {put, call} from 'redux-saga/effects';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import {AUTH_SUCCESS, ERROR, SEND_OTP_SUCCESS, STORE_FACEBOOK_ID} from '../../reduxConstants';
import {
  facebookLoginAPI,
  googleLoginAPI,
  login,
  sendOtpAPI,
  signup,
  verifyOtpAPI,
} from './../../../services/auth';
import React from 'react';
import {navigate} from '../../../navigation/RootNavigation';
import {showMessage} from 'react-native-flash-message';
import EStyleSheet from 'react-native-extended-stylesheet';

export const navigationRef = React.createRef();

export function* userLoginAuth({user}) {
  try {
    const {data} = yield call(login, user);
    if (data.response.response_code === '200') {
      yield put({
        type: AUTH_SUCCESS,
        authData: {isLoggedIn: true, token: data.data.user_details.token},
        userData: data.data.user_details,
      });
    } else {
      yield put({
        type: ERROR,
        miscData: {error: true, errorMsg: data.response.response_message},
      });
    }
  } catch {}
}

export function* userSignupAuth({user}) {
  try {
    const {data} = yield call(signup, user);

    console.log(data);

    if (data.response.response_code == 200) {
      yield put({
        type: AUTH_SUCCESS,
        userData: {OTPVerification: true},
      });
    } else {
      yield put({
        type: ERROR,
        miscData: {error: true, errorMsg: data.response.response_message},
      });
    }
  } catch {}
}

export function* googleLoginWorker(payload) {
  try {
    const {data} = yield call(googleLoginAPI, payload);
    // if (data.response.response_code === '200') {
    //   yield put({
    //     type: AUTH_SUCCESS,
    //     authData: {isLoggedIn: true, token: data.data.user_details.token},
    //     userData: data.data.user_details,
    //   });
    // } else {
    //   yield put({
    //     type: ERROR,
    //     miscData: {error: true, errorMsg: data.response.response_message},
    //   });
    // }
    yield put({
      type: AUTH_SUCCESS,
      authData: {isLoggedIn: true, token: data.data.user_details.token},
      userData: data.data.user_details,
    });
  } catch {}
}

export function* facebookLoginWorker({payload}) {
  try {
    const {data} = yield call(facebookLoginAPI, payload);
  
    console.log('data ===>', data)
    yield put({
      type: AUTH_SUCCESS,
      authData: {isLoggedIn: true, token: data.data.token},
      userData: data.data,
    });
  } catch {
    yield put({
      type: STORE_FACEBOOK_ID,
      payload
    });
    navigate('EmailLogin', payload);
  }
}

export function* sendOtpWorker({payload}) {
  try {
    yield call(sendOtpAPI, payload);
    yield put({
      type: SEND_OTP_SUCCESS,
      payload,
    });

  } catch(error) {
    console.log('error', error)
    showMessage({
      message: error.message,
      type: 'info',
      backgroundColor: EStyleSheet.value('$WARNING_RED'),
    });
  }
}

export function* verifyOtpWorker({payload}) {
  try {
    console.log('payload1' , payload)
    const {data} = yield call(verifyOtpAPI, payload);
    yield put({
      type: AUTH_SUCCESS,
      authData: {isLoggedIn: true, token: data.data.token},
      userData: data.data,
    });

  } catch(error) {
    console.log('error', error)
    showMessage({
      message: error.response.message,
      type: 'info',
      backgroundColor: EStyleSheet.value('$WARNING_RED'),
    });
  }
}
