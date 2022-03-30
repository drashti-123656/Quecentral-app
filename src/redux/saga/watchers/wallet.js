import {takeLatest} from 'redux-saga/effects';
import {CREATE_ORDER, FETCH_WALLET_DETAILS, VERIFY_PAYMENT} from '../../reduxConstants';
import {createOrderWorker, verifyPaymentWorker, walletDetailsWorker} from '../workers/wallet';

export function* watchCreateOrderService() {
  yield takeLatest(CREATE_ORDER, createOrderWorker);
}

export function* watchVerifyPaymentService() {
  yield takeLatest(VERIFY_PAYMENT, verifyPaymentWorker);
}

export function* watchWalletDetailsService() {
  yield takeLatest(FETCH_WALLET_DETAILS, walletDetailsWorker);
}



