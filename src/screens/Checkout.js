import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '../components/atoms/Button';
import RootScreen from '../components/molecules/rootScreen/RootScreen';
import CustomHeader from '../components/molecules/header/CustomHeader';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import {showMessage} from 'react-native-flash-message';
import {verifyPaymentAction} from '../redux/actions/wallet';

const Checkout = () => {
  const dispatch = useDispatch();
  const {
    orderDetails: {amount, id},
  } = useSelector(({walletReducer}) => walletReducer);

  const {
    userData: {email},
  } = useSelector(({auth}) => auth);

  const handleCheckout = () => {
    console.log('amount', amount);
    console.log('id', id);
    const options = {
      description: 'Add money to wallet',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_7DBE92V0ZiWCac',
      amount: amount,
      name: 'Queue Central',
      order_id: id, //Replace this with an order_id created using Orders API.
      theme: {color: EStyleSheet.value('$PRIMARY')},
    };
    RazorpayCheckout.open(options)
      .then(async razorPayData => {
        const payload = {
          razorpay_payment_id: razorPayData.razorpay_payment_id,
          order_id: razorPayData.razorpay_order_id,
          razorpay_signature: razorPayData.razorpay_signature,
        };
        dispatch(verifyPaymentAction(payload));
      })
      .catch(error => {
        // handle failure
        showMessage({
          message: `Error: ${error.code} | ${error.description}`,
          type: 'info',
          backgroundColor: EStyleSheet.value('$WARNING_RED'),
        });
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <RootScreen headerComponent={() => <CustomHeader title={'Checkout'} />}>
      <View style={styles.contentContainer}>
        <Text style={styles.amountTitle}>Amount : {amount/100}</Text>
        <Button
          onPress={handleCheckout}
          style={styles.button}
          title={'checkout'}
        />
      </View>
    </RootScreen>
  );
};

export default Checkout;

const styles = EStyleSheet.create({
  amountTitle: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '$TEXT',
    marginBottom: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'flex-end',
  },
});
