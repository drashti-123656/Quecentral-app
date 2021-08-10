import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { CustomInput } from './../../components/input/CustomInput'
import LoginButton from './../../components/button/LoginButton'

const Login = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerCont}>
                <Image
                    source={require('./../../assets/icons/icon.png')}
                    style={{ width: 60, height: 70 }} />
                <Text style={styles.TitleText}>Queue Central</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={{ ...styles.TitleText, color: '#333', marginTop: 50, marginBottom: 20 }}>Login</Text>
                <CustomInput
                    placeholder={'Enter mobile number'}
                />
                <CustomInput
                    placeholder={'Password'}
                />

                <Text
                    style={{
                        textAlign: 'right',
                        padding: 5,
                        marginRight: 12,
                        fontSize: 12
                    }}>Didn't recieve the OTP? Resend OTP</Text>


                <LoginButton
                    title={'Login'}
                    onPress={() => navigation.navigate('Dashboard')}
                />

                <Text style={{ textAlign: 'center' }}>Don't have an account ?
                    <Text
                        onPress={() => navigation.navigate('Signup')}
                        style={{ color: '#2BBBA0', fontWeight: 'bold' }}> Signup</Text>
                </Text>

            </View>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2BBBA0",
        flex: 1,
        justifyContent: 'flex-end'
    },
    headerCont: {
        height: 190,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TitleText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bodyContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    }
})
