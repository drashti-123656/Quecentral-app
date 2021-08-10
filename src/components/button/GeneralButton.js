import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { COLORS } from './../../utils/theme'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ViewMore = () => {
    return (
        <LinearGradient
        start={{ x: 0, y: 0 }}
       end={{ x: 1, y: 0 }}
       colors={['#72E5D8', '#41C8B1', '#16AE8F']} 
       style={{
            backgroundColor: COLORS.PRIMARY,
            width: 90,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5
        }}>
            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize:12 }}>View more</Text>
        </LinearGradient>
    )
}

const BookNow = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
        onPress={() => navigation.navigate('FindAProfessional')}>
        <LinearGradient
         start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#72E5D8', '#41C8B1', '#16AE8F']} style={{
            backgroundColor: COLORS.PRIMARY,
            width: 90,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5
        }}>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Book Now</Text>
        </LinearGradient>
        </TouchableOpacity>
    )
}

export { ViewMore, BookNow } 

const styles = StyleSheet.create({})
