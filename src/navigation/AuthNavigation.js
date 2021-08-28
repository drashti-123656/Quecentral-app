import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import EmailLogin from './../screens/auth/EmailLogin'
import Signup from './../screens/auth/Signup' 
import Dashboard from './../screens/Dashboard'

const Stack = createStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="EmailLogin" component={EmailLogin}  options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup}  options={{ headerShown: false }} />
            <Stack.Screen name="Dashboard" component={Dashboard}  options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AuthNavigation

const styles = StyleSheet.create({})
