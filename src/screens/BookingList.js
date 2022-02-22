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
import {requestBookingListData} from '../redux/bookingList/action';

const BookingList = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
const dispatch = useDispatch();
 const bookingListData = useSelector(state => state.bookingListReducer.listData);
  useEffect(() => {
    dispatch(requestBookingListData());
  }, []);

 const refreshScreen = async () => {
    setRefreshing(true);
    requestBookingListData();
    setRefreshing(false);
  }; 

  return (
    <View style={styles.screen}>
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator color={COLORS.PRIMARY} size={'large'} />
        </View>
      ) : (
        <FlatList
          data={bookingListData}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshScreen} />
          }
          renderItem={({item}) => (
            <View style={{marginHorizontal: 10, marginBottom: 10}}>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10,
  },
});
