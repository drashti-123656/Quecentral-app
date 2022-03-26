import {put, call} from 'redux-saga/effects';
import { couponDetailsAPI } from './../../../services/api';
import {
  FETCH_COUPON_SUCCESS
} from '../../reduxConstants';

export function* fetchCouponWorker({payload}) {
  try {
    const {data} = yield call(couponDetailsAPI,payload);
    yield put({
      type: FETCH_COUPON_SUCCESS,
      payload: data.data.Coupon_list,
    });
  } catch (error) {
    console.log(error);
  }
}
