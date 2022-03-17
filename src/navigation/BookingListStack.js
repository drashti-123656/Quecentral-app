import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookingList from './../screens/BookingList'
import ServiceDetails from './../screens/ServiceDetails'
import {COLORS} from './../utils/theme'
import EStyleSheet from 'react-native-extended-stylesheet';

const bookingListStack = createNativeStackNavigator();

const BookingListStack = () => {
    return (
        <bookingListStack.Navigator
        initialRouteName="BookingList"
        screenOptions={{
          headerStyle: {backgroundColor: EStyleSheet.value('$PRIMARY')},
          headerTintColor: '#fff',
        }}>
        <bookingListStack.Screen
          name="BookingList"
          options={{headerShown: true}}
          component={BookingList}
        />
         <bookingListStack.Screen
          name="ServiceDetails"
          options={{headerShown: false}}
          component={ServiceDetails}
        />
        
  
      </bookingListStack.Navigator>
    )
}

export default BookingListStack

const styles = StyleSheet.create({})
