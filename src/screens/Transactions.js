import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  RefreshControl,
  Modal,
  Pressable,
  TouchableOpacity,
  Image,
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
import Loader from '../components/atoms/Loader';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {date} from 'yup';

const Transactions = props => {
  const dispatch = useDispatch();
  const [fromdatemodal, setfromdatemodal] = useState(false);
  const [todatemodal, settodatemodal] = useState(false);
  const [fromdate, setfromdate] = useState('');
  const [finalModal, setfinalModal] = useState(false);
  const [todate, settodate] = useState('');

  const {transactions, isFetching} = useSelector(
    ({transactionReducer}) => transactionReducer,
  );

  useEffect(() => {
    const payload = {
      from_date: fromdate.dateString,
      to_date: todate.dateString,
    };
    dispatch(fetchTransactionsAction(payload));
  }, []);

  const _handleRefresh = () => {
    const payload = {
      from_date: fromdate.dateString,
      to_date: todate.dateString,
    };
    dispatch(fetchTransactionsAction(payload));
  };
  const handleFilterResult = () => {
    if (fromdate.dateString === undefined) {
      alert('please enter from date');
    } else if (todate.dateString === undefined) {
      alert('please enter To date');
    } else {
      setfinalModal(true);
      const payload = {
        from_date: fromdate.dateString,
        to_date: todate.dateString,
      };
      dispatch(fetchTransactionsAction(payload));
    }
  };

  const onFromDayPress = dateString => {
    setfromdate(dateString);
    setfromdatemodal(false);
  };

  const onToDayPress = dateString => {
    settodate(dateString);
    settodatemodal(false);
  };

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
    isFetching ? <Loader /> : <NoResultFound />;

  const _handleRenderFooter = () => (
    <>{isFetching && transactions.length !== 0 ? <Loader /> : null}</>
  );

  return (
    <RootScreen headerComponent={() => <CustomHeader title={'Transactions'} />}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={styles.title}>From Date:</Text>
          </View>
          <View>
            <Text style={styles.toTitle}>To Date:</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setfromdatemodal(true)}>
              <Text style={{color: EStyleSheet.value('$TEXT')}}>
                {fromdate ? fromdate.dateString : 'Choose date'}
              </Text>
              <Modal
                animationType="fade"
                visible={fromdatemodal}
                transparent={true}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Pressable
                    onPress={() => setfromdatemodal(false)}
                    style={{
                      height: '100%',
                      width: '100%',
                      opacity: 0.7,
                      backgroundColor: '#000',
                      position: 'absolute',
                    }}></Pressable>
                  <View style={styles.modalCont}>
                    <Calendar
                      placeholder={'Choose Date'}
                      onDayPress={onFromDayPress}
                      value={fromdate}
                    />
                  </View>
                </View>
              </Modal>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              style={styles.input}
              onPress={() => settodatemodal(true)}>
              <Text style={{color: EStyleSheet.value('$TEXT')}}>
                {todate ? todate.dateString : 'Choose date'}
              </Text>
              <Modal
                animationType="fade"
                visible={todatemodal}
                transparent={true}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Pressable
                    onPress={() => settodatemodal(false)}
                    style={{
                      height: '100%',
                      width: '100%',
                      opacity: 0.7,
                      backgroundColor: '#000',
                      position: 'absolute',
                    }}></Pressable>
                  <View style={styles.modalCont}>
                    <Calendar
                      placeholder={'Choose Date'}
                      onDayPress={onToDayPress}
                      value={todate}
                    />
                  </View>
                </View>
              </Modal>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={handleFilterResult}>
            <Text
              style={{fontWeight: 'bold', color: EStyleSheet.value('$WHITE')}}>
              Submit
            </Text>
            <View style={{marginTop: 200}}>
              <Modal
                animationType="fade"
                visible={finalModal}
                transparent={true}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <View>
                    <TouchableOpacity onPress={() => setfinalModal(false)}>
                      <Image
                        style={styles.close}
                        source={require('../../src/assets/icons/close.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <Pressable
                    onPress={() => setfinalModal(false)}
                    style={{
                      height: '100%',
                      width: '100%',
                      opacity: 0.7,
                      backgroundColor: '#000',
                      position: 'absolute',
                    }}></Pressable>
                  <View></View>
                  <View style={styles.modalCont}>
                    <FlatList
                      data={transactions}
                      renderItem={handleTransactionItems}
                      ListEmptyComponent={_handleEmptyComponentRender}
                      ListFooterComponent={_handleRenderFooter}
                      keyExtractor={item => item.id}
                      contentContainerStyle={styles.flatlistContainer}
                      refreshControl={
                        <RefreshControl
                          refreshing={isFetching}
                          onRefresh={_handleRefresh}
                        />
                      }
                    />
                  </View>
                </View>
              </Modal>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    width: 180,
    borderRadius: 10,
    borderColor: '$PRIMARY',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: 'transparent',
    color: '$TEXT',
    marginTop: 10,
  },
  card_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card_text: {
    color: '$TEXT',
  },
  close: {
    width: 50,
    height: 50,
    position: 'absolute',
    left: 320,
    bottom: 90,
  },
  modalCont: {
    padding: 10,
    flex: 0.5,
    marginHorizontal: 20,
    backgroundColor: '$GRAY',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '$PRIMARY',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
  flatlistContainer: {flexGrow: 1},
  title: {
    marginTop: 120,
    fontWeight: 'bold',
  },
  toTitle: {
    marginTop: 120,
    marginLeft: 130,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '$PRIMARY',
    padding: 10,
    height: 45,
    width: 100,
    marginTop: 50,
    marginLeft: 230,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
