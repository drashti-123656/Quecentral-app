import React from 'react';
import Navigate from './src/navigation/Navigate';
import {Appearance} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import Splash from './src/screens/Splash';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistedStore} from './src/redux/store';
import EStyleSheet from 'react-native-extended-stylesheet';
import {darkTheme, lightTheme} from './src/styles/themes';
import {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { useEffect } from 'react';

const colorScheme = Appearance.getColorScheme();

EStyleSheet.build(colorScheme === 'light' ? lightTheme : darkTheme);

const App = () => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    !shouldRender ? 
    setShouldRender(true) : null
  }, [shouldRender])
  
  const toggleTheme = () => {
    const theme =
      EStyleSheet.value('$theme') === 'light' ? darkTheme : lightTheme;
    EStyleSheet.build(theme);
    setShouldRender(false);
    // setState() called twice to re-render whole component tree
    // this.setState({shouldRender: false}, () => this.setState({shouldRender: true}));
  };
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Splash />}
        persistor={persistedStore}
        onBeforeLift={() => new Promise(resolve => setTimeout(resolve, 3000))}>
      { shouldRender ? <Navigate /> : null}

        <TouchableOpacity onPress={toggleTheme}>
          <Text>Toggle Theme</Text>
        </TouchableOpacity>
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
};

export default App;
