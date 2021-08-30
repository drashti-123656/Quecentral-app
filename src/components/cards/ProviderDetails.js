import React from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { COLORS } from './../../utils/theme'
import Stars from './../../components/review/Stars'
import LinearGradient from 'react-native-linear-gradient';
import { BASE_URL } from './../../utils/global'

const ProviderDetails = ({ style, image, name, email, mobileno }) => {
    const navigation = useNavigation();

    return (
        <View style={{...styles.container, ...style}}>
            <Text style={{...styles.h1, marginBottom:5}}>Provider Details</Text>

            <View style={{...styles.rowCont, alignItems:'flex-start'}}>
                <Image
                    source={{uri:`${BASE_URL}${image}`}}
                    style={{ width: 40, height: 40, borderRadius:50 }} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.h1}>{name}</Text>
                    <View style={styles.rowCont}>
                        <Image
                            source={require('./../../assets/icons/home.png')}
                            style={{ width: 15, height: 15, marginRight: 10 }} />
                        <Text style={styles.h3}>{email}</Text>
                    </View>

                    <View style={styles.rowCont}>
                        <Image
                            source={require('./../../assets/icons/call.png')}
                            style={{ width: 15, height: 15, marginRight: 10 }} />
                        <Text style={styles.h3}>{mobileno}</Text>
                    </View>
                </View>
            </View>
        </View>

    )
}

export default ProviderDetails

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding:10,
        marginHorizontal:10,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    rowCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3,
    },
    h1: {
        fontWeight: 'bold',
    },
    h3: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333'
    }
})
