import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import { COLORS } from './../utils/theme'
import { profileDetails } from './../services/dashboard'
import { BASE_URL } from './../utils/global'

const Settings = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [userDetails, setUserDetails] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchUserDetails()
    }, [isFocused])

    const fetchUserDetails = async () => {
        setLoading(true)
        let response = await profileDetails();
        if (response.data.response.response_code == 200) {
            setUserDetails(response.data.data)
        }
        setLoading(false)
    }

    return (
        <View style={styles.container}>

            {loading ?
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator size={'large'} color={COLORS.PRIMARY}/>
            </View>
            :
            <>
            <View style={{ ...styles.rowCont, marginTop: 20 }}>
                {userDetails.profile_img == '' ?
                    <Image
                        source={require('./../assets/icons/user.png')}
                        style={{ ...styles.profilePic, marginRight: 20 }} />
                    :
                    <Image
                        source={{ uri: `${BASE_URL}${userDetails.profile_img}` }}
                        style={{ ...styles.profilePic, marginRight: 20 }} />
                }

                <View>
                    <Text style={{ ...styles.h1, marginBottom: 5 }}>{userDetails.name}</Text>
                    <View style={{ ...styles.rowCont, marginBottom: 5 }}>
                        <Image
                            source={require('./../assets/icons/mail.png')}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.PRIMARY,
                                marginRight: 10
                            }} />
                        <Text>{userDetails.email}</Text>
                    </View>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfile', {userDetails})}
                        style={{
                            padding: 10,
                            backgroundColor: COLORS.PRIMARY,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text
                            style={{ fontWeight: 'bold', color: '#fff' }}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.menuCont}>
                <View style={{ ...styles.rowCont, ...styles.menuItems }}>
                    <View style={styles.iconWrapper}>
                        <Image
                            source={require('./../assets/icons/notification.png')}
                            style={{ width: 15, height: 15, tintColor: COLORS.PRIMARY }} />
                    </View>
                    <Text style={styles.h2}>Notification</Text>
                </View>

                <View style={{ ...styles.rowCont, ...styles.menuItems }}>
                    <View style={styles.iconWrapper}>
                        <Image
                            source={require('./../assets/icons/wallet.png')}
                            style={{ width: 15, height: 15, tintColor: COLORS.PRIMARY }} />
                    </View>
                    <Text style={styles.h2}>Wallet</Text>
                </View>

                <View style={{ ...styles.rowCont, ...styles.menuItems, borderBottomWidth: 0 }}>
                    <View style={styles.iconWrapper}>
                        <Image
                            source={require('./../assets/icons/credit-card.png')}
                            style={{ width: 15, height: 15, tintColor: COLORS.PRIMARY }} />
                    </View>
                    <Text style={styles.h2}>Transactions</Text>
                </View>

            </View>
            </>
            }
         
        </View>
     
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius:50
    },
    rowCont: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuCont: {
        borderColor: '#d1d1d1',
        borderWidth: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        borderRadius: 10,
        marginTop: 30,
        marginHorizontal: 0
    },
    menuItems: {
        paddingVertical: 20,
        borderBottomColor: '#d1d1d1',
        borderBottomWidth: 1
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
    iconWrapper: {
        borderRadius: 50,
        backgroundColor: COLORS.secondary,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    }
})
