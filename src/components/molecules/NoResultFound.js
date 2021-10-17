import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const NoResultFound = () => {
    return (
        <View style={styles.container}>
            <Image 
            source={require('./../../assets/icons/not-found.png')}
            style={styles.Image}
            />
            <Text style={styles.h1}>No results found</Text>
        </View>
    )
}

export default NoResultFound

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    h1:{
        textAlign:'center',
        fontWeight:'bold'
    },
    Image:{
width:50,
height:50
    }
})
