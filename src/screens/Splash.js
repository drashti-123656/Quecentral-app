import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions, Image, ActivityIndicator} from 'react-native';
import { COLORS } from './../utils/theme'

const Splash = () => {

    return(
        <View style={styles.container}>
            <Image source={require('./../assets/images/splash.png')} style={styles.SplashImage} />
            <View style={{
                position:'absolute',
                bottom:20,
                width:'100%',
                justifyContent:'center',
                
            }}><ActivityIndicator size="large" color={COLORS.PRIMARY} /></View>
        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    
    SplashImage:{
        flex:1,
        width: Dimensions.get('window').width,
        resizeMode: 'cover',
        justifyContent:'center'
    }
})