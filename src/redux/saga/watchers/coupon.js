import {takeLatest} from 'redux-saga/effects';
import {FETCH_COUPON_DETAILS} from '../../reduxConstants';
import {fetchCouponWorker} from '../workers/coupon';

export function* watchCouponDetails() {
  yield takeLatest(FETCH_COUPON_DETAILS, fetchCouponWorker);
}
