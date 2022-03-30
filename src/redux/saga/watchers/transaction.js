import {takeLatest} from 'redux-saga/effects';
import {FETCH_TRANSACTIONS} from '../../reduxConstants';
import {fetchCouponWorker} from '../workers/coupon';
import {fetchTransactionsWorker} from '../workers/transactions';

export function* watchTransactions() {
  yield takeLatest(FETCH_TRANSACTIONS, fetchTransactionsWorker);
}
