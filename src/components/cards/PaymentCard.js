import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {COLORS} from './../../utils/theme';

const PaymentCard = () => {
  return (
    <View style={{...styles.rowCont, ...styles.paymentCardCont}}>
      <Image
        source={require('./../../assets/images/service01.jpg')}
        style={styles.serviceImage}
      />

      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={{...styles.h1, marginBottom: 5}}>Car Washing</Text>

        <View
          style={{...styles.rowCont, alignItems: 'center', marginBottom: 5}}>
          <Image
            source={require('./../../assets/icons/user.png')}
            style={styles.profilePic}
          />
          <Text style={{...styles.h2, marginLeft: 10}}>Nithya User</Text>
        </View>

        <View style={{...styles.rowCont, justifyContent: 'space-between'}}>
          <Text
            style={{
              ...styles.h2,
              color: COLORS.warningGreen,
              fontWeight: 'normal',
            }}>
            Completed
          </Text>
          <Text style={styles.h2}>16 Jul 2021</Text>
        </View>
      </View>

      <Text style={styles.amount}>$500</Text>
    </View>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  rowCont: {
    flexDirection: 'row',
  },
  paymentCardCont: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  profilePic: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  h1: {
    fontWeight: 'bold',
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#333',
  },
  amount: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontWeight: 'bold',
  },
});
