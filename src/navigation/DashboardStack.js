import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from './../utils/theme';
import Dashboard from './../screens/Dashboard';
import FindAProfessional from './../screens/FindAProfessional';
import ServiceDetails from './../screens/ServiceDetails';
import Payment from './../screens/Payment';
import Reviews from './../screens/Reviews';
import Demo from './../screens/Demo';
import BookingList from './../screens/BookingList'

const dashboardStack = createNativeStackNavigator();

const DashboardStack = () => {
  return (
    <dashboardStack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {backgroundColor: COLORS.PRIMARY},
        headerTintColor: '#fff',
      }}>
      <dashboardStack.Screen
        name="Dashboard"
        options={{headerShown: false}}
        component={Dashboard}
      />

      <dashboardStack.Screen
        name="FindAProfessional"
        options={{headerShown: false}}
        component={FindAProfessional}
      />

      <dashboardStack.Screen
        name="ServiceDetails"
        options={{headerShown: false}}
        component={ServiceDetails}
      />

      <dashboardStack.Screen
        name="Payment"
        options={{
          headerShown: true,
          title: 'Payment',
        }}
        component={Payment}
      />

      <dashboardStack.Screen
        name="Reviews"
        component={Reviews}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Reviews',
          headerBackVisible: true,
        })}
      />

      <dashboardStack.Screen
        name="BookingList"
        component={BookingList}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Booking List',
          headerBackVisible: true,
        })}
      />
    </dashboardStack.Navigator>
  );
};

export default DashboardStack;

const styles = StyleSheet.create({});
