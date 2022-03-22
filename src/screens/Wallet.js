import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {COLORS} from './../utils/theme';
import LoginButton from './../components/button/LoginButton';
import {BASE_URL} from '../utils/global';
import {
  walletDetails as walletDetailsAPI,
  walletHistory as walletHistoryAPI,
  walletTransaction as walletTransactionAPI
} from './../services/api';
import Card from './../components/cards/Card';
import RazorpayCheckout from 'react-native-razorpay';
import EStyleSheet from 'react-native-extended-stylesheet';

import RootScreen from '../components/molecules/rootScreen/RootScreen';
import CustomHeader from '../components/molecules/header/CustomHeader';

const Wallet = () => {
  const {userData : {name, email, mobileno}} = useSelector(({auth}) => auth);

  const [walletInfo, setWalletInfo] = useState({});
  const [amount, setAmount] = useState('');
  const [paymentGateway, setPaymentGateway] = useState('paypal');
  const [wallet_transactions, set_wallet_transactions] = useState([]);

  const [viewModal, setViewModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWalletDetails();
    fetchWalletHistory();
  }, []);

  const fetchWalletDetails = async () => {
    setLoading(true);
    const response = await walletDetailsAPI();
    if (response.data.response.response_code == 200) {
      setWalletInfo(response.data.data.wallet_info);
    }
    setLoading(false);
  };

  const fetchWalletHistory = async () => {
    setLoading(true);
    const response = await walletHistoryAPI();
    if (response.data.response.response_code == 200) {
      set_wallet_transactions(response.data.data.wallet_info.wallet_history);
    }
    setLoading(false);
  };

  const addWalletHandler = () => {
    {
      var options = {
        description: 'Add money to wallet',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_7DBE92V0ZiWCac',
        amount: amount * 100,
        name: 'Queue Central',
        //  order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
        prefill: {
          email: email,
          contact: mobileno,
          name: name,
        },
        theme: {color: EStyleSheet.value('$PRIMARY')},
      };
      RazorpayCheckout.open(options)
        .then(async(data) => {
          let formData = new URLSearchParams({
            transaction_id: data.razorpay_payment_id,
            transaction_amount: amount
          })
          let response = await walletTransactionAPI(formData)
          console.log(response)
          if(response.data.response.response_code == 200){
            fetchWalletDetails();
            fetchWalletHistory();
          }else{
            showMessage({
              message: response.data.response.response_message,
              type: 'info',
              backgroundColor: EStyleSheet.value('$WARNING_RED'),
            });
          }
          console.log(data);
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
    }
  };

  return (
    <RootScreen headerComponent={() => <CustomHeader title={'Wallet'}  />}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.myWalletCont}>
          <Text style={styles.wallet_text}>My Wallet</Text>
          <View style={styles.wallet_view}>
            <Text style={styles.h1}>
              {loading ? (
                <ActivityIndicator color={EStyleSheet.value('$PRIMARY')} />
              ) : (
                walletInfo.wallet_amt
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

            <Text
              style={styles.credit_debit_text}>
              {loading ? (
                <ActivityIndicator color={EStyleSheet.value('$PRIMARY')} />
              ) : (
                `+ ${walletInfo.currency} ${walletInfo.total_credit}`
              )}
            </Text>
          </View>
          <View
            style={styles.line}></View>
          <View>
            <View style={styles.credit_debit}>
              <Image
                source={require('./../assets/icons/upArrow.png')}
                style={styles.credit_debit_img}
              />
              <Text style={styles.text}>Total Debit</Text>
            </View>
            <Text
              style={styles.credit_debit_text}>
              {loading ? (
                <ActivityIndicator color={EStyleSheet.value('$PRIMARY')} />
              ) : (
                `+ ${walletInfo.currency} ${Math.round(walletInfo.total_debit)}`
              )}
            </Text>
          </View>
        </View>

        <View style={styles.withdrawCont}>
          <View
            style={styles.withdrawCont_view}>
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
                addWalletHandler();
              }
            }}
          />
        </View>

        <View>
          <Text style={styles.transaction}>
            Transaction History
          </Text>

          {loading && <ActivityIndicator color={EStyleSheet.value('$PRIMARY')} />}

          {wallet_transactions.map((item, i) => (
            <Card key={i} style={styles.itemContainer}>
              {/* <Image
                source={{uri: `${BASE_URL}${item.profile_img}`}}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  marginRight: 5,
                  alignSelf: 'flex-start',
                }}
              /> */}
              <View style={styles.transactionHistory_view}>
                <View
                  style={styles.transaction_history}>
                  <Text style={{...styles.h1, fontSize: 15}}>
                    {item.reason}
                  </Text>
                  <Text
                    style={{
                      ...styles.h1,
                      fontSize: 18,
                      color: EStyleSheet.value('$PRIMARY'),
                    }}>{`${item.currency} ${item.total_amt}`}</Text>
                </View>
                <Text style={styles.history_text}>
                  Gateway :{' '}
                  <Text>{'Razorpay'}</Text>
                </Text>
                <View
                  style={styles.transaction_history}>
                  <Text
                    style={[
                      styles.h2,
                      {color: '#a1a1a1', fontWeight: 'normal', fontSize: 12},
                    ]}>
                    {item.created_at.split(' ')[0]}
                  </Text>
                  <Text
                    style={[
                      styles.h2,
                      {marginTop: 'auto', fontSize: 13, color: 'green'},
                    ]}>
                    {' '}
                    Paid
                  </Text>
                </View>
              </View>
            </Card>
          ))}
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
    padding: 10
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
    alignItems: 'flex-end'
  },
  text: {
    color: '#a1a1a1'
  },
  withdrawCont_textinput: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 10,
    color:'#000'
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
    alignItems: 'center'
  },
  credit_debit_img: {
    width: 20, 
    height: 20, 
    marginRight: 10
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
    height: 30
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
    marginBottom: 10
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '$CARD_BACKGROUND'
  },
  transactionHistory_view: {
    marginLeft: 10, 
    marginRight: 10, 
    flex: 1,
    
  },
  history_text: {
    color: '$TEXT'
  },
  transaction_history : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
