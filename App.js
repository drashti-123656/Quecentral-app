import React from 'react';
import Navigate from './src/navigation/Navigate';
import { Appearance } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import Splash from './src/screens/Splash';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistedStore} from './src/redux/store';
import EStyleSheet from 'react-native-extended-stylesheet';
import {darkTheme, lightTheme} from './src/styles/themes';

const colorScheme = Appearance.getColorScheme();

EStyleSheet.build(colorScheme === 'light' ? lightTheme : darkTheme);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Splash />}
        persistor={persistedStore}
        onBeforeLift={() => new Promise(resolve => setTimeout(resolve, 3000))}>
        <Navigate />
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
};

export default App;
