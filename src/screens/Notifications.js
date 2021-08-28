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
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator color={COLORS.PRIMARY} size={'large'} />
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
                style={{width: 50, height: 50, borderRadius: 50}}
              />
              <View style={{marginLeft: 10, flex: 1}}>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
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
