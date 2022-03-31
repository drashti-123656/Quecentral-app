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
import {useDispatch, useSelector} from 'react-redux';
import {fetchBookingsAction} from './../redux/actions/bookings';
import EStyleSheet from 'react-native-extended-stylesheet';
import RootScreen from '../components/molecules/rootScreen/RootScreen';
import CustomHeader from '../components/molecules/header/CustomHeader';
import NoResultFound from '../components/molecules/NoResultFound';
import Loader from '../components/atoms/Loader';

const BookingList = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const {bookingsList, isFetching} = useSelector(
    ({bookingsReducer}) => bookingsReducer,
  );

  useEffect(() => {
    dispatch(fetchBookingsAction());
  }, []);

  const _handleRefresh = () => {
    dispatch(fetchBookingsAction());
  };

  const _handleEmptyComponentRender = () =>
    isFetching ? <Loader /> : <NoResultFound />;

  const _handleRenderFooter = () => (
    <>{isFetching && bookingsList.length !== 0 ? <Loader /> : null}</>
  );

  return (
    <RootScreen headerComponent={() => <CustomHeader title={'Bookings'} />}>
      <FlatList
        data={bookingsList}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={refreshScreen} />
        // }
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
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={_handleEmptyComponentRender}
        ListFooterComponent={_handleRenderFooter}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={_handleRefresh} />
        }
        keyExtractor={item => item.id}
      />
    </RootScreen>
  );
};

export default BookingList;

const styles = EStyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '$BACKGROUND',
  },
  screen_view: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  item_view: {
    marginBottom: 10,
    marginTop:60
  },
  flatListContainer: {flexGrow: 1},
});
