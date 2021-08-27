import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Settings from './../screens/Settings'
import EditProfile from './../screens/EditProfile'
import Wallet from './../screens/Wallet'
import { COLORS } from './../utils/theme'

const dashboardStack = createStackNavigator();

const SettingsStack = () => {
    return (
        <dashboardStack.Navigator initialRouteName="Dashboard">
            <dashboardStack.Screen
                name="Settings"
                component={Settings}
                options={{
                    title: 'Setting',
                    headerStyle: {
                        backgroundColor: COLORS.PRIMARY,
                    },
                    headerTintColor: '#fff',
                }} />
            <dashboardStack.Screen name="EditProfile"
                component={EditProfile}
                options={{
                    title: 'Edit Profile',
                    headerStyle: {
                        backgroundColor: COLORS.PRIMARY,
                    },
                    headerTintColor: '#fff',
                }}
            />
               <dashboardStack.Screen name="Wallet"
                component={Wallet}
                options={{
                    title: 'Wallet',
                    headerStyle: {
                        backgroundColor: COLORS.PRIMARY,
                    },
                    headerTintColor: '#fff',
                }}
            />
        </dashboardStack.Navigator>
    )
}

export default SettingsStack

const styles = StyleSheet.create({})
