import {takeLatest} from 'redux-saga/effects';
import {FETCH_SERVICE_DETAILS} from '../../reduxConstants';
import {fetchServiceDetailsWorker} from '../workers/serviceDetails';

export function* watchServiceDetails() {
  yield takeLatest(FETCH_SERVICE_DETAILS, fetchServiceDetailsWorker);
}
