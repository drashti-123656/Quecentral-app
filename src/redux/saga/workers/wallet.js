import {put, call} from 'redux-saga/effects';
import {createOrderAPI, verifyPaymentAPI, walletDetailsAPI} from './../../../services/api';
import {
  CREATE_ORDER_FAILED,
  CREATE_ORDER_SUCCESS,
  FETCH_WALLET_DETAILS_SUCCESS,
  VERIFY_PAYMENT_FAILED,
  VERIFY_PAYMENT_SUCCESS
} from '../../reduxConstants';
import EStyleSheet from 'react-native-extended-stylesheet';
import {navigate} from '../../../navigation/RootNavigation';
import {showMessage} from 'react-native-flash-message';


export function* walletDetailsWorker() {
  try {
    const {data} = yield call(walletDetailsAPI);

    console.log('data', data)
    yield put({
      type: FETCH_WALLET_DETAILS_SUCCESS,
      payload: data.data.wallet_info,
    });
  } catch (error) {
    console.log(error);
    showMessage({
      message: error.response.data.response.response_message,
      type: 'info',
      backgroundColor: EStyleSheet.value('$WARNING_RED'),
    });
  }
}

export function* createOrderWorker({payload}) {
  try {
    const {data} = yield call(createOrderAPI, payload);
    yield put({
      type: CREATE_ORDER_SUCCESS,
      payload: data.data,
    });
    navigate('Checkout');
  } catch (error) {
    console.log(error);
    yield put({
      type: CREATE_ORDER_FAILED,
      payload: error.response.data.response.response_message,
    });
    showMessage({
      message: error.response.data.response.response_message,
      type: 'info',
      backgroundColor: EStyleSheet.value('$WARNING_RED'),
    });
  }
}

export function* verifyPaymentWorker({payload}) {
  try {
    const {data} = yield call(verifyPaymentAPI, payload);
    console.log('data', data)
    yield put({
      type: VERIFY_PAYMENT_SUCCESS,
      payload: data.data,
    });
    navigate('Wallet');
  } catch (error) {
    console.log(error);
    yield put({
      type: VERIFY_PAYMENT_FAILED,
      payload: error.response.data.response.response_message,
    });
    showMessage({
      message: error.response.data.response.response_message,
      type: 'info',
      backgroundColor: EStyleSheet.value('$WARNING_RED'),
    });
  }
}
