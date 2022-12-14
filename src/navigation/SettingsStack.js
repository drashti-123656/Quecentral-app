import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from './../screens/Settings';
import EditProfile from './../screens/EditProfile';
import Wallet from './../screens/Wallet';
import Coupon from './../screens/Coupon';
import {COLORS} from './../utils/theme';
import Notifications from './../screens/Notifications';
import Transactions from './../screens/Transactions';
import EStyleSheet from 'react-native-extended-stylesheet';
import WalletStack from './WalletStack';

const dashboardStack = createNativeStackNavigator();

const SettingsStack = () => {
  return (
    <dashboardStack.Navigator initialRouteName="Dashboard">
      <dashboardStack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Setting',
          headerStyle: {
            backgroundColor: EStyleSheet.value('$PRIMARY'),
          },
          headerTintColor: '#fff',
          headerShown: false,
        }}
      />
      <dashboardStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Edit Profile',
          headerStyle: {
            backgroundColor: EStyleSheet.value('$PRIMARY'),
          },
          headerTintColor: '#fff',
        }}
      />

      <dashboardStack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Notifications',
          headerStyle: {
            backgroundColor: EStyleSheet.value('$PRIMARY'),
          },
          headerTintColor: '#fff',
          headerShown: false,
        }}
      />

      <dashboardStack.Screen
        name="WalletStack"
        component={WalletStack}
        options={{
          headerShown: false,
        }}
      />

      <dashboardStack.Screen
        name="Coupon"
        component={Coupon}
        options={{
          headerShown: false,
          title: 'coupon',
          headerStyle: {
            backgroundColor: EStyleSheet.value('$PRIMARY'),
          },
          headerTintColor: '#fff',
        }}
      />

      <dashboardStack.Screen
        name="Transactions"
        component={Transactions}
        options={{
          headerShown: false,
        }}
      />
    </dashboardStack.Navigator>
  );
};

export default SettingsStack;

const styles = StyleSheet.create({});
