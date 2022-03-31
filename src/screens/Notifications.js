import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from 'react-native';
import Card from './../components/cards/Card';
import {notificationList as notificationListAPI} from './../services/api';
import {COLORS} from './../utils/theme';
import {BASE_URL} from './../utils/global';
import EStyleSheet from 'react-native-extended-stylesheet';
import RootScreen from '../components/molecules/rootScreen/RootScreen';
import CustomHeader from '../components/molecules/header/CustomHeader';
import NoResultFound from '../components/molecules/NoResultFound';
import {useDispatch, useSelector} from 'react-redux';
import {fetchNotificationsAction} from '../redux/actions/notifications';
import Loader from '../components/atoms/Loader';
import Config from 'react-native-config';

const Notifications = () => {
  const dispatch = useDispatch();
  const {notifications, isFetching} = useSelector(
    ({notificationReducer}) => notificationReducer,
  );

  useEffect(() => {
    dispatch(fetchNotificationsAction());
  }, []);

  const _handleRefresh = () => {
    dispatch(fetchNotificationsAction());
  };

  const _handleEmptyComponentRender = () =>
    isFetching ? <Loader /> : <NoResultFound />;

  const _handleRenderFooter = () => (
    <>{isFetching && notifications.length !== 0 ? <Loader /> : null}</>
  );

  const _handleNotificationItems = ({item}) => (
    <Card style={styles.card}>
      <Image
        source={{uri: `${Config.BASE_URL}/${item.profile_img}`}}
        style={styles.card_image}
      />
      <View style={styles.card_view}>   
        <Text style={styles.h1}>{item.name}</Text>
        <Text style={styles.h2}>{item.message}</Text>
        <Text style={styles.h3}>{item.utc_date_time}</Text>
      </View>
    </Card>
  )

  return (
    <RootScreen headerComponent={() => <CustomHeader title={'Notification'} />}>
      <FlatList
        data={notifications}
        ListEmptyComponent={_handleEmptyComponentRender}
        renderItem={_handleNotificationItems}
        contentContainerStyle={styles.flexboxContainer}
        ListFooterComponent={_handleRenderFooter}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={_handleRefresh} />
        }
        keyExtractor={item => item.id}
      />
    </RootScreen>
  );
};

export default Notifications;

const styles = EStyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '$BACKGROUND',
  },
  flexboxContainer: {flexGrow: 1},
  screen_view: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  card_image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  card_view: {
    marginLeft: 10,
    flex: 1,
  },
  h1: {
    color: '$TEXT',
    fontWeight: 'bold',
    marginBottom:5
  },
  h2: {
    color: '$TEXT',
    opacity: 0.5
  },
  h3: {
    color:'$TEXT',
    fontSize: 12,
    fontWeight: 'bold',
    opacity: 0.5
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
