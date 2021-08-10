import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import { COLORS } from './../utils/theme'
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'
import ProviderDetails from './../components/cards/ProviderDetails'


const ServiceDetails = () => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#72E5D8', '#41C8B1', '#16AE8F']}
            style={styles.container}>
            <View style={styles.headerBar}>
                <Text style={{ ...styles.h1, color: '#fff', marginLeft: 10 }}>Dashboard</Text>
            </View>
            <View style={styles.bodyContainer}>


                <View style={styles.ImageWrapper}>
                    <Swiper showsButtons={false}>
                        <Image
                            source={require('./../assets/images/service01.png')}
                            style={styles.image}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                        <Image
                            source={require('./../assets/images/service01.png')}
                            style={styles.image}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                    </Swiper>
                </View>


                <ScrollView showsVerticalScrollIndicator={false}>


                    <View style={{marginTop:250}}>
                        <ProviderDetails />
                    </View>

                </ScrollView>
            </View>

        </LinearGradient>
    )
}

export default ServiceDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.PRIMARY,
    },
    headerBar: {
        height: 50,
        justifyContent: 'center'
    },
    bodyContainer: {
        flex: 0.94,
        backgroundColor: '#fff',
        marginTop: 'auto',
        padding: 10
    },
    h1: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    h2: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333'
    },
    h3: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333'
    },
    rowCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageWrapper: {
        position: 'absolute',
        width: '100%',
        height: 250,
        top: -25,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 8,
    },
    image: {
        flex: 1,
        borderRadius: 10,
    },

})
