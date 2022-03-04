import React from 'react';
import { View, Text } from 'react-native';
import Navigate from './src/navigation/Navigate'
import { watchLoginUser, watchSignup } from './src/redux/saga/watchers/auth'
import FlashMessage from "react-native-flash-message";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';

import Splash from './src/screens/Splash'

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'

import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './src/redux/store'
import {watchEditProfile} from './src/redux/saga/watchers/editProfile';
import reducer from './src/redux/reducers/auth';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
const persistedStore = persistStore(store)

function* rootSaga() {
  yield fork(watchLoginUser);
  yield fork(watchSignup);
  yield fork(watchEditProfile);
}
sagaMiddleware.run(rootSaga)

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
         loading={<Splash />} 
         persistor={persistedStore}
         onBeforeLift={() => new Promise(resolve => setTimeout(resolve, 3000))}
      >
        <Navigate />
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
}

export default App