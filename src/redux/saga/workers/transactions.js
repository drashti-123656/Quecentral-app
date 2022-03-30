import {showMessage} from 'react-native-flash-message';
import {put, call} from 'redux-saga/effects';
import {walletHistoryAPI} from './../../../services/api';
import {
  FETCH_TRANSACTIONS_SUCCESS,
} from '../../reduxConstants';
import EStyleSheet from 'react-native-extended-stylesheet';
import {navigate, navReset} from '../../../navigation/RootNavigation';

export function* fetchTransactionsWorker({payload}) {
  try {
    const {data} = yield call(walletHistoryAPI, payload);
    yield put({
      type: FETCH_TRANSACTIONS_SUCCESS,
      payload: data.data.wallet_info.wallet_history,
    });
  } catch (error) {
    console.log(error);
    showMessage({
      message: error.response.data.response.response_message,
      type: 'info',
      backgroundColor: EStyleSheet.value('$WARNING_RED'),
    });
  }
}