import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Setting = () => {
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Image
            source={require('./../assets/icons/sadEmoji.png')}
            style={{width:70, height:70, marginBottom:10}} />
            <Text style={styles.h1}>This page is under Development</Text>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    h1:{
        fontSize:20,
        fontWeight:'bold',
    }
})
