import {takeLatest} from 'redux-saga/effects';
import {CREATE_ORDER, VERIFY_PAYMENT} from '../../reduxConstants';
import {createOrderWorker, verifyPaymentWorker} from '../workers/wallet';

export function* watchCreateOrderService() {
  yield takeLatest(CREATE_ORDER, createOrderWorker);
}

export function* watchVerifyPaymentService() {
  yield takeLatest(VERIFY_PAYMENT, verifyPaymentWorker);
}

