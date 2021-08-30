import React from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { COLORS } from './../../utils/theme'
import { BASE_URL } from './../../utils/global'
import Stars from './../../components/review/Stars'
import LinearGradient from 'react-native-linear-gradient';

const ServiceCard = ({ service_id, image, location, service_title, service_amount, currency }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
        onPress={() => navigation.navigate('ServiceDetails', {
            serviceId : service_id
        })}>
            <LinearGradient
                pointerEvents={'none'}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#E6FFF9', '#fff', '#fff']}
                style={styles.container}>
                <Image
                    source={{uri: `${BASE_URL}${image}`}}
                    style={{ width: 70, height: 70, borderRadius: 5 }}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.h1}>{service_title}</Text>
                    <Stars />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.rowCont}>
                            <Image
                                source={require('./../../assets/icons/call.png')}
                                style={{ width: 15, height: 15 }}
                                PlaceholderContent={<ActivityIndicator />}
                            />
                            <Text style={styles.h3}>xxxxxxxxxx</Text>
                        </View>
                        <View style={{ ...styles.rowCont, marginLeft: 10 }}>
                            <Image
                                source={require('./../../assets/icons/location.png')}
                                style={{ width: 15, height: 15 }}
                                PlaceholderContent={<ActivityIndicator />}
                            />
                            <Text style={styles.h3}>{location}</Text>
                        </View>
                    </View>
                    <Text style={{
                        ...styles.h1,
                        position: 'absolute',
                        top: 0,
                        right: 5,
                        color: COLORS.PRIMARY
                    }}>{`${currency} ${service_amount}`}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default ServiceCard

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
        marginLeft: 5
    }
})
