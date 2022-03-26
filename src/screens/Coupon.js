import React, { useState, useEffect } from 'react';
import {
    View,
    ActivityIndicator,
    RefreshControl,
    FlatList,
} from 'react-native';

import { COLORS } from './../utils/theme';
import EStyleSheet from 'react-native-extended-stylesheet';
import RootScreen from '../components/molecules/rootScreen/RootScreen';
import CustomHeader from '../components/molecules/header/CustomHeader';
import NoResultFound from '../components/molecules/NoResultFound';
import { useDispatch, useSelector } from 'react-redux';
import { couponAction } from '../redux/actions/coupon';
import CouponCard from './../components/cards/CouponCard';

const Coupon = () => {
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const { couponData, isFetching } = useSelector(({ coupon }) => coupon);

    const refreshScreen = async () => {
        setRefreshing(true);
        requestBookingListData();
        setRefreshing(false);
    };
    useEffect(() => {
        dispatch(couponAction());
    }, []);
    const _handleEmptyComponentRender = () =>
        isFetching ? _handleRenderFooter() : <NoResultFound />;
    const _handleRenderFooter = () => (
        <>
            {isFetching ? (
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <ActivityIndicator color={COLORS.PRIMARY} size={'large'} />
                </View>
            ) : null}
        </>
    );
    return (
        <RootScreen headerComponent={() => <CustomHeader title={'Coupon'} />}>
            <View style={styles.topContainer}> 
                <FlatList
                    data={couponData}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refreshScreen} />
                    }
                    renderItem={({ item }) => (
                        <View style={styles.container}>
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
    
});
