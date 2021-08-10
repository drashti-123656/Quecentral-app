import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation'
import DashboardNavigation from './DashboardNavigation'

const Navigate = () => {
    return (
        <NavigationContainer>
            <AuthNavigation />
        </NavigationContainer>
    )
}

export default Navigate

const styles = StyleSheet.create({})
