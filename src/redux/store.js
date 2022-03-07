import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {fork} from 'redux-saga/effects';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './rootReducer';
import {watchLoginUser, watchSignup} from './saga/watchers/auth';
import {watchEditProfile} from './saga/watchers/editProfile';
import {watchBookingList} from './saga/watchers/bookings';
import {watchSearchServices} from './saga/watchers/searchServices';

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
  yield fork(watchEditProfile);
  yield fork(watchBookingList);
  yield fork(watchSearchServices);
}
sagaMiddleware.run(rootSaga);

export {store, persistedStore};
