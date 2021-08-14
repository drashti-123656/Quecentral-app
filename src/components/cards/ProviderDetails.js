import React from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { COLORS } from './../../utils/theme'
import Stars from './../../components/review/Stars'
import LinearGradient from 'react-native-linear-gradient';

const ProviderDetails = ({ image }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Provider Details</Text>

            <View style={{...styles.rowCont, alignItems:'flex-start'}}>
                <Image
                    source={require('./../../assets/icons/home.png')}
                    style={{ width: 40, height: 40 }} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.h1}>Jhon Deo</Text>
                    <View style={styles.rowCont}>
                        <Image
                            source={require('./../../assets/icons/home.png')}
                            style={{ width: 20, height: 20, marginRight: 10 }} />
                        <Text style={styles.h3}>jhon@gmail.com</Text>
                    </View>

                    <View style={styles.rowCont}>
                        <Image
                            source={require('./../../assets/icons/call.png')}
                            style={{ width: 20, height: 20, marginRight: 10 }} />
                        <Text style={styles.h3}>234567891</Text>
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
        marginBottom: 7
    },
    h3: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333'
    }
})
