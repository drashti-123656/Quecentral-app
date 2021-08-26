import React from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'
import PaymentCard from '../components/cards/PaymentCard'

const Payment = () => {
    return (
        <View style={styles.screen}>
            <PaymentCard />
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10
    },

})
