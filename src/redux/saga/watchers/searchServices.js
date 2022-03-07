import {takeLatest} from 'redux-saga/effects';
import {FETCH_SERVICES} from '../../reduxConstants';
import {fetchServicesWorker} from '../workers/searchServices';

export function* watchSearchServices() {
  yield takeLatest(FETCH_SERVICES, fetchServicesWorker);
}
