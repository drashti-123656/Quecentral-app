import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import {COLORS} from '../utils/theme';
import BookingCard from './../components/cards/BookingCard';
import { useDispatch, useSelector } from "react-redux";
import {fetchBookingsAction} from './../redux/actions/bookings';
import EStyleSheet from 'react-native-extended-stylesheet';

const BookingList = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
const dispatch = useDispatch();
 const {bookingsList} = useSelector(({bookingsReducer}) => bookingsReducer);
  useEffect(() => {
    dispatch(fetchBookingsAction());
  }, []);

 const refreshScreen = async () => {
    setRefreshing(true);
    requestBookingListData();
    setRefreshing(false);
  }; 

  return (
    <View style={styles.screen}>
      {loading ? (
        <View style={styles.screen_view}>
          <ActivityIndicator color={EStyleSheet.value('$PRIMARY')} size={'large'} />
        </View>
      ) : (
        <FlatList
          data={bookingsList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshScreen} />
          }
          renderItem={({item}) => (
            <View style={styles.item_view}>
              <BookingCard
                service_id={item.service_id}
                service_title={item.service_title}
                service_image={item.service_image}
                service_date={item.service_date}
                from_time={item.from_time}
                to_time={item.to_time}
                location={item.location}
                service_amount={item.service_amount}
              />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default BookingList;

const styles = EStyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '$BACKGROUND'
  },
  screen_view: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1
  },
  item_view: {
    marginHorizontal: 10, 
    marginBottom: 10
  }
});
