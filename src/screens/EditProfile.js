import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import { showMessage, hideMessage } from "react-native-flash-message";
import { COLORS } from './../utils/theme'
import LoginButton from './../components/button/LoginButton'
import { CustomInputWithTitle } from './../components/input/CustomInput'
import { updateUser as updateUserAPI } from './../services/dashboard'


const EditProfile = ({ route }) => {
    const { userDetails } = route.params;

    const [name, setName] = useState(userDetails.name)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        let formdata = new URLSearchParams({
            name: name,
            user_currency: 'INR',
            type: 1
        })
        let response = await updateUserAPI(formdata)

        if (response.data.response.response_code == 200) {
            showMessage({
                message: response.data.response.response_message,
                type: "info",
                backgroundColor: COLORS.warningGreen,
            });
        } else {
            showMessage({
                message: response.data.response.response_message,
                type: "info",
                backgroundColor: COLORS.warningGreen,
            });
        }
        setLoading(false)
    }
    return (
        <View style={styles.container}>
            <View style={{ ...styles.rowCont, marginVertical: 20 }}>
                {userDetails.profile_img == '' ?
                    <Image
                        source={require('./../assets/icons/user.png')}
                        style={{ ...styles.profilePic, marginRight: 20 }} />
                    :
                    <Image
                        source={{ uri: `${BASE_URL}${userDetails.profile_img}` }}
                        style={{ ...styles.profilePic, marginRight: 20 }} />
                }
                <View style={{flex:1}}>
                    <CustomInputWithTitle
                        title={'Email'}
                        placeholder={userDetails.email}
                        value={userDetails.email}
                        editable={false} />
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <CustomInputWithTitle
                    title={'Name'}
                    placeholder={'Edit name'}
                    value={name}
                    onChangeText={setName} />

                <LoginButton
                    title={'Update'}
                    onPress={handleSubmit}
                    loading={loading} />
            </View>

        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
        paddingHorizontal: 20
    },
    rowCont: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    h1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    h2: {
        fontWeight: 'bold',
        color: '#333'
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
