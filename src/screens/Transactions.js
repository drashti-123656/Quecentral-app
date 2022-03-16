import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native'
import {
    walletHistory as walletHistoryAPI,
  } from './../services/api';
import Card from './../components/cards/Card'
import { COLORS } from './../utils/theme'
import EStyleSheet from 'react-native-extended-stylesheet';

const Transactions = () => {

    const [loading, setLoading] = useState(false);
    const [wallet_transactions, set_wallet_transactions] = useState([]);

    useEffect(() => {
        fetchWalletHistory()
    }, [])

    const fetchWalletHistory = async () => {
        setLoading(true);
        const response = await walletHistoryAPI();
        if (response.data.response.response_code == 200) {
          set_wallet_transactions(response.data.data.wallet_info.wallet_history);
        }
        setLoading(false);
      };

    return (
        <ScrollView style={styles.screen}>
         

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
              <View style={styles.screen_view}>
                <View
                  style={styles.card_view}>
                  <Text style={{...styles.h1, fontSize: 15}}>{item.reason}</Text>
                  <Text
                    style={{
                      ...styles.h1,
                      fontSize: 18,
                      color: EStyleSheet.value('$PRIMARY'),
                    }}>{`${item.currency} ${item.total_amt}`}</Text>
                </View>
                <Text style={styles.card_text}>
                  Gateway :{' '}
                  <Text>
                    {'Razorpay'}
                  </Text>
                </Text>
                <View
                  style={styles.card_view}>
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
        </ScrollView>
    )
}

export default Transactions

const styles = EStyleSheet.create({
    screen:{
        padding:10,
        backgroundColor: '$BACKGROUND'
    },
    screen_view: {
      marginLeft: 10, 
      marginRight: 10, 
      flex: 1
    },
    card_view: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    card_text: {
      color: '$TEXT'
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
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: 'white',
      },
})
