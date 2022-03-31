import React, {useEffect} from 'react';
import {View, RefreshControl, FlatList} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import RootScreen from '../components/molecules/rootScreen/RootScreen';
import CustomHeader from '../components/molecules/header/CustomHeader';
import NoResultFound from '../components/molecules/NoResultFound';
import {useDispatch, useSelector} from 'react-redux';
import {couponAction} from '../redux/actions/coupon';
import CouponCard from './../components/cards/CouponCard';
import Loader from '../components/atoms/Loader';

const Coupon = () => {
  const dispatch = useDispatch();
  const {couponData, isFetching} = useSelector(({coupon}) => coupon);

  useEffect(() => {
    dispatch(couponAction());
  }, []);

  const _handleRefresh = () => {
    dispatch(couponAction());
  };

  const _handleEmptyComponentRender = () =>
    isFetching ? <Loader /> : <NoResultFound />;

  const _handleRenderFooter = () => (
    <>{isFetching && bookingsList.length !== 0 ? <Loader /> : null}</>
  );

  return (
    <RootScreen headerComponent={() => <CustomHeader title={'Coupon'} />}>
      <View style={styles.topContainer}>
        <FlatList
          data={couponData}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={_handleRefresh}
            />
          }
          renderItem={({item}) => (
            <View style={styles.container}>
              <CouponCard
                id={item.id}
                name={item.name}
                discount={item.discount}
                count={item.count}
                used_coupon={item.used_coupon}
                expiry_date={item.expiry_date}
              />
            </View>
          )}
          contentContainerStyle={styles.flatListContainer}
          ListEmptyComponent={_handleEmptyComponentRender}
          ListFooterComponent={_handleRenderFooter}
          keyExtractor={item => item.id}
        />
      </View>
    </RootScreen>
  );
};

export default Coupon;

const styles = EStyleSheet.create({
  container: {
    marginTop: 10,
  },
  topContainer: {
    marginTop: 30,
  },
  flatListContainer: {flexGrow: 1},
});
