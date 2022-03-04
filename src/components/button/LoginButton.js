import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'

const LoginButton = ({ title, onPress, loading }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}
            disabled={loading}
        >
            {loading ? 
           <ActivityIndicator color={'white'}/>: 
            <Text style={styles.title}>{title}</Text>
            }
            
        </TouchableOpacity>
    )
}

export default LoginButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2BBBA0',
        height: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    }
})
