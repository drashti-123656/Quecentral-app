import {takeLatest} from "redux-saga/effects";

export function* watchBookingList() {
  yield takeLatest(REQUEST_BOOOKINGLIST_DATA, userReceiveAll);
}
