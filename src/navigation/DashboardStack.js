import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './../screens/Dashboard'
import FindAProfessional from './../screens/FindAProfessional'
import ServiceDetails from './../screens/ServiceDetails'

const dashboardStack = createStackNavigator();

const DashboardStack = () => {
    return (
        <dashboardStack.Navigator initialRouteName="Dashboard">
            <dashboardStack.Screen name="Dashboard" options={{ headerShown: false }} component={Dashboard} />
            <dashboardStack.Screen name="FindAProfessional" options={{ headerShown: false }} component={FindAProfessional} />
            <dashboardStack.Screen name="ServiceDetails" options={{ headerShown: false }} component={ServiceDetails} />
        </dashboardStack.Navigator>
    )
}

export default DashboardStack

const styles = StyleSheet.create({})
