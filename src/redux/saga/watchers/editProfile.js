import {takeLatest} from 'redux-saga/effects';
import {FETCH_STATE, FETCH_CITY, UPDATE_PROFILE} from '../../reduxConstants';
import {fetchCityWorker, fetchStateWorker, updateProfileWorker} from '../workers/editProfile';

export function* watchEditProfile() {
  yield takeLatest(FETCH_STATE, fetchStateWorker);
  yield takeLatest(FETCH_CITY, fetchCityWorker);
  yield takeLatest(UPDATE_PROFILE, updateProfileWorker);
}
