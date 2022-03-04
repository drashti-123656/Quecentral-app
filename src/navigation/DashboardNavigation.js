import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from './../utils/theme';
import DashboardStack from './DashboardStack';
import SettingsStack from './SettingsStack';
import Logout from './../screens/auth/Logout';
import BookingListStack from './BookingListStack';
import http from './../services/httpServices';

const Tab = createBottomTabNavigator();

const AuthNavigation = () => {
  const {
    authData: {token},
  } = useSelector(({auth}) => auth);

  useEffect(() => {
    http.setToken(token);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerStyle: {backgroundColor: COLORS.PRIMARY},
        headerTintColor: '#fff',
        tabBarStyle: {backgroundColor: COLORS.PRIMARY},
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return (
              <Image
                source={require('./../assets/icons/home.png')}
                style={{width: 22, height: 22, tintColor: '#fff'}}
              />
            );
          } else if (route.name === 'BookingListStack') {
            return (
              <Image
                source={require('./../assets/icons/list.png')}
                style={{width: 22, height: 22, tintColor: '#fff'}}
              />
            );
          } else if (route.name === 'SettingsStack') {
            return (
              <Image
                source={require('./../assets/icons/setting.png')}
                style={{width: 22, height: 22, tintColor: '#fff'}}
              />
            );
          } else if (route.name === 'Logout') {
            return (
              <Image
                source={require('./../assets/icons/logout.png')}
                style={{width: 22, height: 22, tintColor: '#fff'}}
              />
            );
          }
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
      })}>
      <Tab.Screen
        name="Home"
        component={DashboardStack}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="BookingListStack"
        component={BookingListStack}
        options={{
          title: 'Booking List',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          title: 'Setting',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
