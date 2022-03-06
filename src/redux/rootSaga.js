import {takeLatest} from 'redux-saga/effects';
import {fetchBookingsWorker} from './saga/workers/bookings';
import {FETCH_BOOKINGS} from './reduxConstants';

export function* watchBookingList() {
  yield takeLatest(FETCH_BOOKINGS, fetchBookingsWorker);
}
