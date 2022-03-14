import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from './../utils/theme';
import DashboardStack from './DashboardStack';
import SettingsStack from './SettingsStack';
import Logout from './../screens/auth/Logout';
import BookingListStack from './BookingListStack';
import http from './../services/httpServices';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/actions/auth';
const Tab = createBottomTabNavigator();

const AuthNavigation = () => {
  const dispatch = useDispatch();
  const {
    authData: {token},
  } = useSelector(({auth}) => auth);

  useEffect(() => {
    http.setToken(token);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerStyle: {backgroundColor: 'transparent'},
        headerTintColor: '#fff',
        tabBarStyle: {backgroundColor: 'transparent'},
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return (
              <Image
                source={require('./../assets/icons/home.png')}
                style={styles.Image_icon}
              />
            );
          } else if (route.name === 'BookingListStack') {
            return (
              <Image
                source={require('./../assets/icons/list.png')}
                style={styles.Image_icon}
              />
            );
          } else if (route.name === 'SettingsStack') {
            return (
              <Image
                source={require('./../assets/icons/setting.png')}
                style={styles.Image_icon}
              />
            );
          } else if (route.name === 'Logout') {
            return (
              <Image
                source={require('./../assets/icons/logout.png')}
                style={styles.Image_icon}
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
        options={{
          title: 'Logout',
          headerShown: false,
        }}
        listeners={({navigation, route}) => ({
          tabPress: () => {
            Alert.alert('', 'Are you sure you want to Logout?', [
              {
                text: 'Cancel',
                onPress: () => navigation.navigate('Home'),
                style: 'cancel',
              },
              {text: 'Yes', onPress: () => dispatch(logout())},
            ]);
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({
  Image_icon: {width: 22, height: 22, tintColor: '#fff'},
});
