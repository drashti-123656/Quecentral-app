import { put, call } from 'redux-saga/effects';

import {
    
    RECEIVE_BOOKINGLIST_DATA
} from '../bookingList/contants';
import { bookingList } from '../../services/api';



export function* userReceiveAll() {
    try {
        const { data } = yield call(bookingList);

        if (data.response.response_code == 200) {
            yield put({
                type: RECEIVE_BOOKINGLIST_DATA,
                listData:data.data
            
            });

        } else {
            yield put({
                type: ERROR,
                miscData: { error: true, errorMsg: data.response.response_message },
            });
        }


    } catch {

    }
}

