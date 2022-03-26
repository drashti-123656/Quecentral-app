import React, { useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import { todayString } from 'react-native-calendars/src/expandableCalendar/commons';

const CouponCard = ({
    id, name, discount, expiry_date, count, used_coupon
}) => {
    const handleCoupon = () => {
        console.log('coupon copied')
    }

    return (
        <TouchableOpacity onPress={handleCoupon}>
            <LinearGradient
                pointerEvents={'none'}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[
                    EStyleSheet.value('$ALPHA_PRIMARY'),
                    EStyleSheet.value('$CARD_BACKGROUND'),
                    EStyleSheet.value('$CARD_BACKGROUND'),
                ]}
                style={styles.container}>

                <View style={{ marginVertical: 10, }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.h1}> {id} </Text>
                        <Text style={styles.h1}>{used_coupon}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.h1}>{count} </Text>
                        <Text style={styles.h1}>{name} </Text>
                        <Text style={styles.h1}>{discount}</Text>
                    </View>
                    <Text
                        style={{ ...styles.h1, position: 'absolute', right: 5, }}>
                        {expiry_date}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default CouponCard;

const styles = EStyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '$CARD_BACKGROUND',
    },

    h1: {
        fontWeight: 'bold',
        marginBottom: 7,
        color: '$TEXT',
        marginLeft: 7
    },

});
