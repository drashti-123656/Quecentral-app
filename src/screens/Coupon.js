import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    RefreshControl,
    FlatList,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Card from './../components/cards/Card';
import { notificationList as notificationListAPI } from './../services/api';
import { COLORS } from './../utils/theme';
import { BASE_URL } from './../utils/global';
import EStyleSheet from 'react-native-extended-stylesheet';
import RootScreen from '../components/molecules/rootScreen/RootScreen';
import CustomHeader from '../components/molecules/header/CustomHeader';
import NoResultFound from '../components/molecules/NoResultFound';

import { useDispatch, useSelector } from 'react-redux';
import { couponAction } from '../redux/actions/coupon';
import CouponCard from './../components/cards/CouponCard';

const Coupon = () => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const { couponData } = useSelector(({ coupon }) => coupon);

    const refreshScreen = async () => {
        setRefreshing(true);
        requestBookingListData();
        setRefreshing(false);
    };

    const id = 10;
    const name = 'winter sales';
    const discount = '10% OFF'
    const count = 51;
    const expiry_date = '24/03/2021';
    const used_coupon = 'SALE250';

    useEffect(() => {
        dispatch(couponAction());
    }, []);
    const _handleEmptyComponentRender = () => <NoResultFound />;

    return (
        <RootScreen headerComponent={() => <CustomHeader title={'Coupon'} />}>

            <View>
                <FlatList
                    data={couponData}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refreshScreen} />
                    }

                    renderItem={({ item }) => (
                        <View style={styles.container}>
                            {console.log('coupon data===>', couponData)}
                            <CouponCard
                                id={item.id}
                                name={item.name}
                                discount={item.discount}
                                count={item.count}
                                used_coupon={item.used_coupon}
                                expiry_date={item.expiry_date} />

                        </View>
                    )}
                    contentContainerStyle={{ flex: 1 }}
                    ListEmptyComponent={_handleEmptyComponentRender}
                    keyExtractor={item => item.id}
                />

            </View>

        </RootScreen>
    );
};

export default Coupon;

const styles = EStyleSheet.create({

    container: {
        marginTop: 50,

    },
});
