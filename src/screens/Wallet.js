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
} from 'react-native';
import {useSelector} from 'react-redux';
import COLORS from './../utils/theme';
import LoginButton from './../components/button/LoginButton';
import {BASE_URL} from '../utils/global';

const Wallet = () => {
  const {token} = useSelector(state => state.authData);

  const [walletInfo, setWalletInfo] = useState({
    wallet_amt: '$2000',
    total_credit: 20,
    currency: '$',
    total_debit: '20',
  });
  const [amount, setAmount] = useState('');
  const [paymentGateway, setPaymentGateway] = useState('paypal');
  const [wallet_transactions, set_wallet_transactions] = useState([]);

  const [viewModal, setViewModal] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView style={{padding: 20}}>
        <View style={styles.myWalletCont}>
          <Text style={{fontWeight: 'bold'}}>My Wallet</Text>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.h1}>
              {loading ? (
                <ActivityIndicator color={COLORS.primary} />
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
                <ActivityIndicator color={COLORS.primary} />
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
                <ActivityIndicator color={COLORS.primary} />
              ) : (
                `+ ${walletInfo.currency} ${walletInfo.total_debit}`
              )}
            </Text>
          </View>
        </View>

        <View style={styles.withdrawCont}>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{fontWeight: 'bold', marginBottom: 10}}>Withdraw</Text>
            <Image 
            source={require('./../assets/images/razorpay.png')}
            style={{width:20, height:20}}/>
          </View>
          <TextInput
            style={{
              backgroundColor: '#f1f1f1',
              borderRadius: 10,
              height: 50,
              paddingHorizontal: 20,
              marginBottom:10
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
                            style={{ alignItems: 'center', borderWidth: 2, borderColor: (paymentGateway == 'paypal') ? COLORS.primary : 'transparent' }}>
                            <Image
                                source={require('../assets/images/paypal2.png')}
                            />

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setPaymentGateway('stripe')
                            }}
                            style={{ alignItems: 'center', borderWidth: 2, borderColor: (paymentGateway == 'stripe') ? COLORS.primary : 'transparent' }}>
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
                setViewModal(true);
              }
            }}
          />
        </View>

        <View>
          <Text style={{fontWeight: 'bold', marginBottom: 10}}>
            Transaction History
          </Text>

          {loading && <ActivityIndicator color={COLORS.primary} />}

          {wallet_transactions.map(item => (
            <View key={item.transaction_id} style={styles.itemContainer}>
              <Image
                source={{uri: `${BASE_URL}${item.profile_img}`}}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  marginRight: 5,
                  alignSelf: 'flex-start',
                }}
              />
              <View style={{marginLeft: 10, marginRight: 10, flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{...styles.h1, fontSize: 15}}>{item.name}</Text>
                  <Text
                    style={{
                      ...styles.h1,
                      fontSize: 18,
                      color: COLORS.primary,
                    }}>{`${item.transaction_currency_code} ${item.transaction_amount}`}</Text>
                </View>
                <Text>
                  Gateway :{' '}
                  <Text style={{fontWeight: 'normal'}}>
                    {item.transaction_gateway}
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
                    {item.transaction_created_date.split(' ')[0]}
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
            </View>
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
