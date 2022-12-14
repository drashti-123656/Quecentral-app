import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {fork} from 'redux-saga/effects';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './rootReducer';
import {
  watchFacebookLogin,
  watchGoogleLogin,
  watchLoginUser,
  watchSendOtp,
  watchSignup,
  watchVerifyOtp,
} from './saga/watchers/auth';
import {watchEditProfile} from './saga/watchers/editProfile';
import {watchBookingList, watchBookService} from './saga/watchers/bookings';
import {watchSearchServices} from './saga/watchers/searchServices';
import {watchServiceDetails} from './saga/watchers/ServiceDetails';
import {watchCouponDetails} from './saga/watchers/coupon';
import {
  watchCreateOrderService,
  watchVerifyPaymentService,
  watchWalletDetailsService,
} from './saga/watchers/wallet';
import {watchTransactions} from './saga/watchers/transaction';
import {watchNotifications} from './saga/watchers/notifications';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistedStore = persistStore(store);

function* rootSaga() {
  yield fork(watchLoginUser);
  yield fork(watchSignup);
  yield fork(watchGoogleLogin);
  yield fork(watchFacebookLogin);
  yield fork(watchSendOtp);
  yield fork(watchVerifyOtp);
  yield fork(watchEditProfile);
  yield fork(watchBookingList);
  yield fork(watchBookService);
  yield fork(watchSearchServices);
  yield fork(watchSearchServices);
  yield fork(watchServiceDetails);
  yield fork(watchCouponDetails);
  yield fork(watchCreateOrderService);
  yield fork(watchVerifyPaymentService);
  yield fork(watchTransactions);
  yield fork(watchWalletDetailsService);
  yield fork(watchNotifications);
  
  
}
sagaMiddleware.run(rootSaga);

export {store, persistedStore};
