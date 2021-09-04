import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookService from './../screens/BookService';
import ServiceDetails from './../screens/ServiceDetails';
import {COLORS} from './../utils/theme';

const serviceDetailsStack = createNativeStackNavigator();

const ServiceDetailsStack = () => {
  return (
    <serviceDetailsStack.Navigator initialRouteName="ServiceDetails">
      <serviceDetailsStack.Screen
        name="ServiceDetails"
        component={ServiceDetails}
        options={{
          title: 'Service Details',
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
          headerTintColor: '#fff',
        }}
      />
      <serviceDetailsStack.Screen
        name="BookService"
        component={BookService}
        options={{
          title: ' Book Service',
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
          headerTintColor: '#fff',
        }}
      />
    </serviceDetailsStack.Navigator>
  );
};

export default ServiceDetailsStack;

const styles = StyleSheet.create({});
