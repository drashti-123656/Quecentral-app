import React, { useState, useEffect } from 'react';
import { Text, View, RefreshControl, Modal, Pressable } from 'react-native';
import { walletHistory as walletHistoryAPI } from './../services/api';
import Card from './../components/cards/Card';
import { COLORS } from './../utils/theme';
import moment from 'moment'; 
import EStyleSheet from 'react-native-extended-stylesheet';
import RootScreen from '../components/molecules/rootScreen/RootScreen';
import CustomHeader from '../components/molecules/header/CustomHeader';
import { fetchTransactionsAction } from '../redux/actions/transactions';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import NoResultFound from '../components/molecules/NoResultFound';
import Loader from '../components/atoms/Loader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CalendarPicker from './../components/picker/CalendarPicker';

const Transactions = () => {
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const { transactions, isFetching } = useSelector(
    ({ transactionReducer }) => transactionReducer,
  );

  useEffect(() => {
    const payload = {
      from_date: '12/03/2021',
      to_date: '02/02/2022',
    };
    dispatch(fetchTransactionsAction(payload));
  }, []);

  const _handleRefresh = () => {
    const payload = {
      from_date: '12/03/2021',
      to_date: '02/02/2022',
    };
    dispatch(fetchTransactionsAction(payload));
  };
  const handleDateSelect = async day => {
    setSelectedDay(day);
    const startOfMonth = moment(day.dateString).startOf('month').format('DD/MM/YYYY');
    const endOfMonth = moment(day.dateString).endOf('month').format('DD/MM/YYYY');

    const payload = {
      from_date: startOfMonth,
      to_date: endOfMonth,
    };
    dispatch(fetchTransactionsAction(payload));
    setModalVisible(false);
  };
  const handleTransactionItems = ({ item }) => (
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
          <Text style={{ ...styles.h1, fontSize: 15 }}>{item.reason}</Text>
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
              { color: '#a1a1a1', fontWeight: 'normal', fontSize: 12 },
            ]}>
            {item.created_at.split(' ')[0]}
          </Text>
          <Text
            style={[
              styles.h2,
              { marginTop: 'auto', fontSize: 13, color: 'green' },
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
  const handlefilter = () => {
    setModalVisible(true);
  }
  const handleFilterClose = () => {
    setModalVisible(false);
  };
  const handleFilterResult = () => {
    setModalVisible(false);
  };
  return (
    <RootScreen headerComponent={() => <CustomHeader title={'Transactions'}
      headerRight={
        <View>
          <Icon
            name="filter-alt"
            size={30}
            color={EStyleSheet.value('$WHITE')}
            onPress={handlefilter}
            style={styles.navButton}
          />
        </View>}
    />}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <View style={styles.filter}>
                <View style={styles.filterHeadingViewStyle}>
                  <Pressable onPress={handleFilterClose}>
                    <Icon name={'close'} size={30} />
                  </Pressable>
                </View>
                <Text style={styles.filterBy}>Filter By</Text>
                <CalendarPicker
                  title={'Select date'}
                  value={selectedDay}
                  onSelect={handleDateSelect}
                  placeholder={'Choose Date'}
                />
              </View>
              <View style={styles.buttonView}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleFilterResult}>
                  <Text style={styles.textStyle}>Show Result</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={transactions}
        renderItem={handleTransactionItems}
        ListEmptyComponent={_handleEmptyComponentRender}
        ListFooterComponent={_handleRenderFooter}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatlistContainer}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={_handleRefresh} />
        }
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
  loaderContainer: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  flatlistContainer: { flexGrow: 1 },
  filterBy: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingBottom: 1,
  },
  filterStyle: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  filter: {
    height: 270,
    padding: 20,
  },
  filterHeadingViewStyle: {
    paddingLeft: 300,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  filterHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 4,
  },
  centeredView: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: 'blue',
    width: 150,
  },
  buttonReset: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1,
  },
  buttonView: {
    marginTop:100,
    flexDirection: 'row-reverse'
  },
  textColor: {
    color: 'blue',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  textSpacing: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    height: 500,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});