import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView, Button } from 'react-native'
import { CustomInput } from './../../components/input/CustomInput'
import { Formik } from 'formik';
import LoginButton from './../../components/button/LoginButton'
import { showMessage, hideMessage } from "react-native-flash-message";
import { COLORS } from './../../utils/theme'
import { login as loginAPI } from './../../services/auth'

const Login = ({ navigation }) => {

    const [MobileNo, setMobileNo] = useState('')
    const [OTP, setOTP] = useState('')

    const handleLogin = async () => {
        data = {
            mobileno: MobileNo,
            otp: OTP,
            country_code: '91'
        }
        let formData = new URLSearchParams(data)

        const response = await loginAPI(formData);
        console.log(response)
        if (response.data.response_code === 200) {
            showMessage({
                message: response.data.response.response_message,
                type: "info",
                backgroundColor: COLORS.warningGreen,
            });
        } else {
            showMessage({
                message: response.data.response.response_message,
                type: "info",
                backgroundColor: COLORS.warningRed,
            });
        }




    }

    useEffect(() => {

    }, [])

    return (
        <View style={styles.container}>
       
            <View style={styles.headerCont}>
                <Image
                    source={require('./../../assets/icons/icon.png')}
                    style={{ width: 60, height: 70 }} />
                <Text style={styles.TitleText}>Queue Central</Text>
            </View>
            <View style={styles.bodyContainer}>
            <ScrollView >
                <Text style={{ ...styles.TitleText, color: '#333', marginTop: 50, marginBottom: 20 }}>Login</Text>
                {/* <CustomInput
                    value={MobileNo}
                    onChangeText={setMobileNo}
                    placeholder={'Enter mobile number'}
                />
                <CustomInput
                    value={OTP}
                    onChangeText={setOTP}
                    placeholder={'OTP'}
                /> */}

                <Formik
                    initialValues={{ email: '' }}
                    onSubmit={values => console.log(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <TextInput
                                onChangeText={handleChange('MobileNo')}
                                onBlur={handleBlur('MobileNo')}
                                value={values.MobileNo}
                                style={styles.input}
                            />

                            <TextInput
                                onChangeText={handleChange('OTP')}
                                onBlur={handleBlur('OTP')}
                                value={values.OTP}
                                style={styles.input}
                            />

                            <Text
                                style={{
                                    textAlign: 'right',
                                    padding: 5,
                                    marginRight: 12,
                                    fontSize: 12
                                }}>Didn't recieve the OTP? Resend OTP
                            </Text>

                            <LoginButton
                                title={'Login'}
                                onPress={handleSubmit}
                            />

                        </View>
                    )}
                </Formik>


                <Text style={{ textAlign: 'center' }}>Don't have an account ?
                    <Text
                        onPress={() => navigation.navigate('Signup')}
                        style={{ color: '#2BBBA0', fontWeight: 'bold' }}> Signup</Text>
                </Text>
                </ScrollView>
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
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#2BBBA0'
    },
})
