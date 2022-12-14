import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import LoginButton from './../components/button/LoginButton';
import {
  walletDetails as walletDetailsAPI,
  walletHistory as walletHistoryAPI,
  walletTransaction as walletTransactionAPI,
} from './../services/api';
import Card from './../components/cards/Card';
import RazorpayCheckout from 'react-native-razorpay';
import EStyleSheet from 'react-native-extended-stylesheet';
import RootScreen from '../components/molecules/rootScreen/RootScreen';
import CustomHeader from '../components/molecules/header/CustomHeader';
import {createOrderAction, walletDetailsAction, walletResetAction} from '../redux/actions/wallet';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Button from '../components/atoms/Button';
import {useFocusEffect} from '@react-navigation/native';

const Wallet = () => {
  const dispatch = useDispatch();
  const {
    userData: {name, email, mobileno},
  } = useSelector(({auth}) => auth);

  const {walletData, isFetchingWalletData} = useSelector(({walletReducer}) => walletReducer);


  const [amount, setAmount] = useState('');
  const [wallet_transactions, set_wallet_transactions] = useState([]);

  
  useFocusEffect(
    React.useCallback(() => {
      dispatch(walletDetailsAction())
    }, [])
  );

  const createOrder = () => {
    const paylaod = {
      payment_amount: amount,
    };
    dispatch(createOrderAction(paylaod));
  };

  return (
    <RootScreen headerComponent={() => <CustomHeader title={'Wallet'} />}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.myWalletCont}>
          <Text style={styles.wallet_text}>My Wallet</Text>
          <View style={styles.wallet_view}>
            <Text style={styles.h1}>
              {isFetchingWalletData ? (
                <ActivityIndicator color={EStyleSheet.value('$PRIMARY')} />
              ) : (
                walletData.wallet_amt
              )}
            </Text>
            <Text style={styles.text}>Available Balance</Text>
          </View>
        </View>

        <View
          style={{
            ...styles.myWalletCont,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View>
            <View style={styles.credit_debit}>
              <Image
                source={require('./../assets/icons/down-arrow.png')}
                style={styles.credit_debit_img}
              />
              <Text style={styles.text}>Total Credit</Text>
            </View>

            <Text style={styles.credit_debit_text}>
              {isFetchingWalletData ? (
                <ActivityIndicator color={EStyleSheet.value('$PRIMARY')} />
              ) : (
                `+ ${walletData.currency} ${walletData.total_credit}`
              )}
            </Text>
          </View>
          <View style={styles.line}></View>
          <View>
            <View style={styles.credit_debit}>
              <Image
                source={require('./../assets/icons/upArrow.png')}
                style={styles.credit_debit_img}
              />
              <Text style={styles.text}>Total Debit</Text>
            </View>
            <Text style={styles.credit_debit_text}>
              {isFetchingWalletData ? (
                <ActivityIndicator color={EStyleSheet.value('$PRIMARY')} />
              ) : (
                `+ ${walletData.currency} ${Math.round(walletData.total_debit)}`
              )}
            </Text>
          </View>
        </View>

        <View style={styles.withdrawCont}>
          <View style={styles.withdrawCont_view}>
            <Text style={styles.withdrawCont_text}>Withdraw</Text>
            <Image
              source={require('./../assets/images/razorpay.png')}
              style={styles.withdrawCont_image}
            />
          </View>
          <TextInput
            style={styles.withdrawCont_textinput}
            placeholder={'$ Enter Amount'}
            placeholderTextColor={EStyleSheet.value('$GRAY')}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />

          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 20 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setPaymentGateway('paypal')
                            }}
                            style={{ alignItems: 'center', borderWidth: 2, borderColor: (paymentGateway == 'paypal') ? COLORS.PRIMARY : 'transparent' }}>
                            <Image
                                source={require('../assets/images/paypal2.png')}
                            />

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setPaymentGateway('stripe')
                            }}
                            style={{ alignItems: 'center', borderWidth: 2, borderColor: (paymentGateway == 'stripe') ? COLORS.PRIMARY : 'transparent' }}>
                            <Image
                                source={require('../assets/images/stripe2.png')}
                            />


                        </TouchableOpacity>
                    </View> */}
          <LoginButton
            title={'Add to wallet'}
            onPress={() => {
              if (amount == '' || amount == 0) {
                showMessage({
                  message: 'Please enter amount ',
                  type: 'info',
                  backgroundColor: EStyleSheet.value('$WARNING_RED'),
                });
                return;
              } else {
                createOrder();
              }
            }}
          />
        </View>

        <View>
          <Text style={styles.transaction}>Transaction History</Text>
          {isFetchingWalletData && (
            <ActivityIndicator color={EStyleSheet.value('$PRIMARY')} />
          )}
        </View>
      </ScrollView>
    </RootScreen>
  );
};

export default Wallet;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$BACKGROUND',
  },
  scrollview: {
    padding: 10,
  },
  myWalletCont: {
    backgroundColor: '$CARD_BACKGROUND',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
  },
  wallet_text: {
    fontWeight: 'bold',
    color: '$TEXT',
  },
  wallet_view: {
    alignItems: 'flex-end',
  },
  text: {
    color: '#a1a1a1',
  },
  withdrawCont_textinput: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 10,
    color: '#000',
  },
  withdrawCont: {
    backgroundColor: '$CARD_BACKGROUND',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  transaction: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '$TEXT',
  },
  credit_debit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  credit_debit_img: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  credit_debit_text: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'right',
    color: '$TEXT',
  },
  line: {
    width: 2,
    backgroundColor: '#a1a1a1',
    height: 30,
  },
  withdrawCont_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  withdrawCont_image: {
    width: 20,
    height: 20,
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 1,
    color: '$TEXT',
  },
  h2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  withdrawCont_text: {
    fontWeight: 'bold',
    color: '$TEXT',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '$CARD_BACKGROUND',
  },
  transactionHistory_view: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  history_text: {
    color: '$TEXT',
  },
  transaction_history: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
