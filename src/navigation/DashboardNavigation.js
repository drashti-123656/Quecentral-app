import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from './../utils/theme'
import DashboardStack from './DashboardStack'
import Setting from './../screens/Setting'
import Logout from './../screens/auth/Logout'

const Tab = createBottomTabNavigator();

const AuthNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: COLORS.PRIMARY },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Image
              source={require('./../assets/icons/home.png')}
              style={{ width: 22, height: 22, tintColor: '#fff' }}
            />;
          } else if (route.name === 'Setting') {
            return <Image
              source={require('./../assets/icons/setting.png')}
              style={{ width: 22, height: 22, tintColor: '#fff' }}
            />;
          }
          else if (route.name === 'Logout') {
            return <Image
              source={require('./../assets/icons/logout.png')}
              style={{ width: 22, height: 22, tintColor: '#fff' }}
            />;
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
      <Tab.Screen name="Setting" component={Setting} />
      <Tab.Screen name="Logout" component={Logout} />
    </Tab.Navigator>
  )
}

export default AuthNavigation

const styles = StyleSheet.create({})
