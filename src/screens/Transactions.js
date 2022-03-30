import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {walletHistory as walletHistoryAPI} from './../services/api';
import Card from './../components/cards/Card';
import {COLORS} from './../utils/theme';
import EStyleSheet from 'react-native-extended-stylesheet';
import RootScreen from '../components/molecules/rootScreen/RootScreen';
import CustomHeader from '../components/molecules/header/CustomHeader';
import {fetchTransactionsAction} from '../redux/actions/transactions';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import NoResultFound from '../components/molecules/NoResultFound';

const Transactions = () => {
  const dispatch = useDispatch();

  const {transactions, isFetching} = useSelector(
    ({transactionReducer}) => transactionReducer,
  );

  useEffect(() => {
    const payload = {
      from_date: '12/03/2021',
      to_date: '29/03/2022',
    };
    dispatch(fetchTransactionsAction(payload));
  }, []);

  const handleTransactionItems = ({item}) => (
    <Card style={styles.itemContainer}>
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
        <View style={styles.card_view}>
          <Text style={{...styles.h1, fontSize: 15}}>{item.reason}</Text>
          <Text
            style={{
              ...styles.h1,
              fontSize: 18,
              color: EStyleSheet.value('$PRIMARY'),
            }}>{`${item.currency} ${item.total_amt}`}</Text>
        </View>
        <Text style={styles.card_text}>
          Gateway : <Text>{'Razorpay'}</Text>
        </Text>
        <View style={styles.card_view}>
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
  );

  const _handleEmptyComponentRender = () =>
    isFetching ? _handleRenderFooter() : <NoResultFound />;

  const _handleRenderFooter = () => (
    <>
      {isFetching ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            color={EStyleSheet.value('$PRIMARY')}
            size={'large'}
          />
        </View>
      ) : null}
    </>
  );

  return (
    <RootScreen headerComponent={() => <CustomHeader title={'Transactions'} />}>
      <FlatList
        data={transactions}
        renderItem={handleTransactionItems}
        ListEmptyComponent={_handleEmptyComponentRender}
        ListFooterComponent={_handleRenderFooter}
        keyExtractor={item => item.id}
        contentContainerStyle={{flex: 1}}
      />
    </RootScreen>
  );
};

export default Transactions;

const styles = EStyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: '$BACKGROUND',
  },
  screen_view: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  card_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card_text: {
    color: '$TEXT',
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
  loaderContainer: {justifyContent: 'center', alignItems: 'center', flex: 1},
});
