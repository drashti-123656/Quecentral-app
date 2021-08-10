import React from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { COLORS } from './../../utils/theme'
import Stars from './../../components/review/Stars'
import LinearGradient from 'react-native-linear-gradient';

const ProviderDetails = ({ image }) => {
    const navigation = useNavigation();

    return (
        <View>
            <Text style={styles.h1}>Provider Details</Text>

            <View style={styles.rowCont}>
                <Image
                    source={require('./../../assets/icons/home.png')}
                    style={{ width: 40, height: 40 }} />
                <View style={{marginLeft:10}}>
                    <Text style={styles.h1}>Jhon Deo</Text>
                    <View style={styles.rowCont}>
                        <Image
                            source={require('./../../assets/icons/home.png')}
                            style={{ width: 20, height: 20, marginRight:10 }} />
                        <Text style={styles.h3}>jhon@gmail.com</Text>
                    </View>

                    <View style={styles.rowCont}>
                        <Image
                            source={require('./../../assets/icons/home.png')}
                            style={{ width: 20, height: 20,  marginRight:10 }} />
                        <Text>jhon@gmail.com</Text>
                    </View>
                </View>
            </View>
        </View>

    )
}

export default ProviderDetails

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.PRIMARY,
        borderRadius: 5,
        marginBottom: 10
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
        color:'#333'
    }
})
