import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {COLORS} from './../utils/theme';
import LoginButton from './../components/button/LoginButton';
import {BASE_URL} from '../utils/global';
import {
  walletDetails as walletDetailsAPI,
  walletHistory as walletHistoryAPI,
} from './../services/api';
import Card from './../components/cards/Card'
import RazorpayCheckout from 'react-native-razorpay';

const Wallet = () => {
  const {token} = useSelector(state => state.authData);

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
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_7DBE92V0ZiWCac',
      amount: '5000',
      name: 'Acme Corp',
    //  order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar'
      },
      theme: {color: '#53a20e'}
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      console.log(data);
    }).catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    });
  }
  }


  return (
    <View style={styles.container}>


  
      <ScrollView style={{padding: 20}}>
        <View style={styles.myWalletCont}>
          <Text style={{fontWeight: 'bold'}}>My Wallet</Text>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.h1}>
              {loading ? (
                <ActivityIndicator color={COLORS.PRIMARY} />
              ) : (
                walletInfo.wallet_amt
              )}
            </Text>
            <Text style={{color: '#a1a1a1'}}>Available Balance</Text>
          </View>
        </View>

        <View
          style={{
            ...styles.myWalletCont,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('./../assets/icons/down-arrow.png')}
                style={{width: 20, height: 20, marginRight: 10}}
              />
              <Text style={{color: '#a1a1a1'}}>Total Credit</Text>
            </View>

            <Text
              style={{fontWeight: 'bold', fontSize: 18, textAlign: 'right'}}>
              {loading ? (
                <ActivityIndicator color={COLORS.PRIMARY} />
              ) : (
                `+ ${walletInfo.currency} ${walletInfo.total_credit}`
              )}
            </Text>
          </View>
          <View
            style={{width: 2, backgroundColor: '#a1a1a1', height: 30}}></View>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('./../assets/icons/upArrow.png')}
                style={{width: 20, height: 20, marginRight: 10}}
              />
              <Text style={{color: '#a1a1a1'}}>Total Debit</Text>
            </View>
            <Text
              style={{fontWeight: 'bold', fontSize: 18, textAlign: 'right'}}>
              {loading ? (
                <ActivityIndicator color={COLORS.PRIMARY} />
              ) : (
                `+ ${walletInfo.currency} ${Math.round(walletInfo.total_debit)}`
              )}
            </Text>
          </View>
        </View>

        <View style={styles.withdrawCont}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', marginBottom: 10}}>Withdraw</Text>
            <Image
              source={require('./../assets/images/razorpay.png')}
              style={{width: 20, height: 20}}
            />
          </View>
          <TextInput
            style={{
              backgroundColor: '#f1f1f1',
              borderRadius: 10,
              height: 50,
              paddingHorizontal: 20,
              marginBottom: 10,
            }}
            placeholder={'$ Enter Amount'}
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
                  backgroundColor: COLORS.warningRed,
                });
                return;
              } else {
                addWalletHandler();
              }
            }}
          />
        </View>

        <View>
          <Text style={{fontWeight: 'bold', marginBottom: 10}}>
            Transaction History
          </Text>

          {loading && <ActivityIndicator color={COLORS.PRIMARY} />}

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
              <View style={{marginLeft: 10, marginRight: 10, flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{...styles.h1, fontSize: 15}}>{item.reason}</Text>
                  <Text
                    style={{
                      ...styles.h1,
                      fontSize: 18,
                      color: COLORS.PRIMARY,
                    }}>{`${item.currency} ${item.total_amt}`}</Text>
                </View>
                <Text>
                  Gateway :{' '}
                  <Text style={{fontWeight: 'normal'}}>
                    {'Razorpay'}
                  </Text>
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
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
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myWalletCont: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
  },
  withdrawCont: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  h2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
});
