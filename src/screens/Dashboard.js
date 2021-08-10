import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import { COLORS } from './../utils/theme'
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'
import { ViewMore, BookNow } from './../components/button/GeneralButton'
import ServiceCard from './../components/cards/ServiceCard'


const Dashboard = () => {
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

                <TextInput
                    style={styles.search}
                    value={''}
                    placeholder='Search Service'
                />

                <ScrollView  showsVerticalScrollIndicator={false}>

                    <View style={styles.wrapper}>
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

                        <LinearGradient
                        pointerEvents={'none'}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0.8, y: 0 }}
                            colors={['transparent', 'transparent', '#000']}
                            style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                        </LinearGradient>

                        <View style={{ position: "absolute", top: 0, right: 20, bottom: 0, justifyContent: 'center' }}>
                            <Text style={{ ...styles.h1, color: '#fff' }}>Best Service</Text>
                            <Text style={{ ...styles.h1, color: '#fff' }}>Provider</Text>
                            <BookNow />

                        </View>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                            <Text style={styles.h2}>Top Services</Text>
                            <ViewMore />
                        </View>

                        <View style={{ ...styles.rowCont, justifyContent: 'space-between', marginBottom: 10 }}>
                            <TouchableOpacity style={{ alignItems: 'center' }}>
                                <View style={styles.iconCont}>
                                    <Image
                                        source={require('./../assets/icons/car-wash.png')}
                                        style={{ width: 40, height: 40 }}
                                        PlaceholderContent={<ActivityIndicator />}
                                    />
                                </View>
                                <Text style={styles.h3}>Car washing</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ alignItems: 'center' }}>
                                <View style={{ ...styles.iconCont, backgroundColor: '#FFF8E6' }}>
                                    <Image
                                        source={require('./../assets/icons/Cleaning.png')}
                                        style={{ width: 40, height: 40 }}
                                        PlaceholderContent={<ActivityIndicator />}
                                    />
                                </View>
                                <Text style={styles.h3}>Roofing</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ alignItems: 'center' }}>
                                <View style={{ ...styles.iconCont, backgroundColor: '#E2F4FF' }}>
                                    <Image
                                        source={require('./../assets/icons/roofing.png')}
                                        style={{ width: 40, height: 40 }}
                                        PlaceholderContent={<ActivityIndicator />}
                                    />
                                </View>
                                <Text style={styles.h3}>Plumbing</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ alignItems: 'center' }}>
                                <View style={{ ...styles.iconCont, backgroundColor: '#F6E8FF' }}>
                                    <Image
                                        source={require('./../assets/icons/Plumbing.png')}
                                        style={{ width: 40, height: 40 }}
                                        PlaceholderContent={<ActivityIndicator />}
                                    />
                                </View>
                                <Text style={styles.h3}>Cleaning</Text>
                            </TouchableOpacity>

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

export default Dashboard

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
    search: {
        position: 'absolute',
        width: '100%',
        height: 50,
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
        marginBottom:10
    },
})
