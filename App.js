import React from 'react';
import { View, Text } from 'react-native';
import Navigate from './src/navigation/Navigate'
import FlashMessage from "react-native-flash-message";

const App = () => {
  return (
    <>
      <Navigate />
      <FlashMessage position="top" />
    </>
  );
}

export default App