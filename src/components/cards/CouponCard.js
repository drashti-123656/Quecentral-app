import React, { useState } from 'react';
import {
    Text,
    View, Clipboard,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
const CouponCard = ({
    id, name, discount, expiry_date, count, used_coupon
}) => {

    const copyToClipboard = () => {
        Clipboard.setString(name);
    };
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[
                EStyleSheet.value('$ALPHA_PRIMARY'),
                EStyleSheet.value('$CARD_BACKGROUND'),
                EStyleSheet.value('$CARD_BACKGROUND'),
            ]}
            style={styles.container}>

            <View >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.h1}>ID: {id} </Text>
                    <Text style={{ ...styles.h1, marginLeft: 133 }}>Code: {name}</Text>
                    <TouchableOpacity onPress={copyToClipboard}>
                        <Text style={{ ...styles.h1, marginLeft: 20, color: '#FFD700' }}>Copy</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.h1}>Total: {count} </Text>
                    <Text style={{ ...styles.h1, marginLeft: 115 }}>Discount: {discount} %OFF</Text>
                </View >
                <View style={{ flexDirection: 'row', }}>
                    <Text selectable={true} style={styles.h1}>Already used:{used_coupon}</Text>
                    <Text style={{ ...styles.h1, marginLeft: 79 }}>Expiry Date: {expiry_date}</Text>
                </View>
            </View>
        </LinearGradient>

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
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
});
