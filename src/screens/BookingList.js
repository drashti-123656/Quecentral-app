import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, View, ScrollView} from 'react-native';
import {COLORS} from '../utils/theme';
import BookingCard from './../components/cards/BookingCard';
import {bookingList} from './../services/dashboard';

const BookingList = () => {
  const [bookingListData, setBookingListData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookingList();
  }, []);

  const fetchBookingList = async () => {
    setLoading(true);
    const response = await bookingList();
    if (response.data.response.response_code == 200) {
      setBookingListData(response.data.data);
    }
    setLoading(false);
  };

  return (
    <View style={styles.screen}>
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator color={COLORS.PRIMARY} size={'large'} />
        </View>
      ) : (
        <ScrollView>
          {bookingListData.map((item, i) => (
            <View key={i} style={{marginHorizontal: 10, marginBottom: 10}}>
              <BookingCard
                service_title={item.service_title}
                service_image={item.service_image}
                service_date={item.service_date}
                from_time={item.from_time}
                to_time={item.to_time}
                location={item.location}
                service_amount={item.service_amount}
              />
            </View>
          ))}
        </ScrollView>
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
