import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation'
import DashboardNavigation from './DashboardNavigation'

const Stack = createStackNavigator();

const Navigate = () => {
    const { isLoggedIn } = useSelector(state => state.reducer.authData)
    return (
        <NavigationContainer>
            <Stack.Navigator >
                {!isLoggedIn ? (
                    <Stack.Screen
                        name="AuthNavigation"
                        options={{ headerShown: false }}
                        component={AuthNavigation} />
                ) : (
                    <Stack.Screen
                        name="DashboardNavigation"
                        options={{ headerShown: false }}
                        component={DashboardNavigation} />
                )
                }

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigate

const styles = StyleSheet.create({})
