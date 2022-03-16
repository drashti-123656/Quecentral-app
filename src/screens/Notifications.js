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

const Notifications = () => {
  const [loading, setLoading] = useState(false);
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
    setLoading(true);
    const response = await notificationListAPI();
    if (response.data.response.response_code == 200) {
      setNotificationData(response.data.data.notification_list);
    }
    setLoading(false);
  };

  return (
    <View style={styles.screen}>
      {loading ? (
        <View style={styles.screen_view}>
          <ActivityIndicator color={EStyleSheet.value('$PRIMARY')} size={'large'} />
        </View>
      ) : (
        <FlatList
          data={notificationData}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchNotification} />
          }
          renderItem={({item}) => (
            <Card style={styles.card}>
              <Image
                source={{uri: `${BASE_URL}${item.profile_img}`}}
                style={styles.card_image}
              />
              <View style={styles.card_view}>
                <Text style={styles.h1}>{item.name}</Text>
                <Text style={styles.h2}>{item.message}</Text>
                <Text style={styles.h3}>{item.utc_date_time}</Text>
              </View>
            </Card>
          )}
          keyExtractor={() => Math.random()}
        />
      )}
    </View>
  );
};

export default Notifications;

const styles = EStyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '$BACKGROUND',
  },
  screen_view: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1
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
    borderRadius: 50
  },
  card_view: {
    marginLeft: 10,
    flex: 1
  },
  h1: {
    color: '#000',
    fontWeight: 'bold',
  },
  h2: {
    color: '#333',
  },
  h3: {
    color: '#a1a1a1',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
