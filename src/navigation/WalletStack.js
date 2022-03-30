import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookService from '../screens/BookService';
import ServiceDetails from '../screens/ServiceDetails';
import {COLORS} from '../utils/theme';
import EStyleSheet from 'react-native-extended-stylesheet';
import Wallet from '../screens/Wallet';
import Checkout from '../screens/Checkout';

const walletStack = createNativeStackNavigator();

const WalletStack = () => {
  return (
    <walletStack.Navigator initialRouteName="Wallet">
      <walletStack.Screen
        name="Wallet"
        component={Wallet}
        options={{
          headerShown: false,
          title: 'Wallet',
          headerStyle: {
            backgroundColor: EStyleSheet.value('$PRIMARY'),
          },
          headerTintColor: '#fff',
        }}
      />

      <walletStack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerShown: false,
        }}
      />
    </walletStack.Navigator>
  );
};

export default WalletStack;

const styles = StyleSheet.create({});
