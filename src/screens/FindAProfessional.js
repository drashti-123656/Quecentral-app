import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import { COLORS } from './../utils/theme'
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import { CustomInputWithTitle } from './../components/input/CustomInput'
import ServiceCard from './../components/cards/ServiceCard'



const FindAProfessional = () => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#72E5D8', '#41C8B1', '#16AE8F']}
            style={styles.container}>
            <View style={styles.headerBar}>
                <Text style={{ ...styles.h1, color: '#fff', marginLeft: 10 }}>Find a professional</Text>
            </View>
            <View style={styles.bodyContainer}>

                <View style={styles.filterOptionsCont}>

                    <View style={styles.rowCont}>
                        <CustomInputWithTitle
                            title={'Short By'}
                            placeholder={'Price low to high'}
                        />

                        <CustomInputWithTitle
                            title={'Short By'}
                            placeholder={'Cleaning'}
                        />
                    </View>

                    <CustomInputWithTitle
                        title={'Location'}
                        placeholder={'Enter location'}
                    />

                    <View style={{height:70}}>
                        <Text style={styles.h3}>Price Range</Text>
                        <Slider
                            style={{ flex: 1, height: 10 }}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor={COLORS.PRIMARY}
                            maximumTrackTintColor="#000000"
                        />
                        <Text style={styles.h2}>$100</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>


                    <View style={{ marginTop: 200 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                            <Text style={styles.h2}>Top Services</Text>
                        </View>
                    </View>


                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />

                </ScrollView>
            </View>

        </LinearGradient>
    )
}

export default FindAProfessional

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
    filterOptionsCont: {
        position: 'absolute',
        width: '100%',
        height: 230,
        top: -25,
        padding: 10,
        zIndex: 1,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
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
        borderRadius: 10,
    },
    iconCont: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5FFFC',
        width: 60,
        height: 60,
        borderRadius: 100
    },
    wrapper: {
        marginTop: 30,
        height: 150,
        borderRadius: 10,
        zIndex: 1,
        marginBottom: 10
    },
    input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#a1a1a1'
    },
})
