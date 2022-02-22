import {takeLatest} from 'redux-saga/effects';

import {
   
    REQUEST_BOOOKINGLIST_DATA,
  } from '../redux/bookingList/contants';

  import {
    
    userReceiveAll
  } from '../redux/bookingList/saga';


 export function* watchBookingList() {
    yield takeLatest(REQUEST_BOOOKINGLIST_DATA, userReceiveAll);
  }
  
  