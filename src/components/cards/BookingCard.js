import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from './../../utils/theme';
import {BASE_URL} from './../../utils/global';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const BookingCard = ({
  service_id,
  service_title,
  service_image,
  service_date,
  from_time,
  to_time,
  location,
  service_amount,
}) => {
  
  const navigation = useNavigation();
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#E6FFF9', '#fff', '#fff']}
      style={{...styles.rowCont, ...styles.bookingCardContainer}}>
      <Image
        source={{uri: `${BASE_URL}${service_image}`}}
        style={styles.serviceImage}
      />

      <View style={{marginLeft: 10, flex: 1}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ServiceDetails', {
              serviceId: service_id,
            })
          }>
          <Text style={{...styles.h1, marginBottom: 5}}>{service_title}</Text>
        </TouchableOpacity>

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <View style={{...styles.rowCont, alignItems: 'center'}}>
            <Image
              source={require('./../../assets/icons/call.png')}
              style={{width: 15, height: 15, marginRight: 5}}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Text style={styles.h3}>xxxxxxxxxx</Text>
          </View>
          <View
            style={{...styles.rowCont, marginLeft: 10, alignItems: 'center'}}>
            <Image
              source={require('./../../assets/icons/location.png')}
              style={{width: 15, height: 15, marginRight: 5}}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Text style={styles.h3}>{location}</Text>
          </View>
        </View>

        <View
          style={{...styles.rowCont, alignItems: 'center', marginBottom: 5}}>
          <Image
            source={require('./../../assets/icons/user.png')}
            style={styles.profilePic}
          />
          <Text style={{...styles.h2, marginLeft: 10}}>Nithya User</Text>
        </View>

        <View style={{...styles.rowCont, justifyContent: 'space-between'}}>
          <Text
            style={{
              ...styles.h2,
              color: '#333',
              fontWeight: 'normal',
            }}>
            {`${from_time} - ${to_time}`}
          </Text>
          <Text style={styles.h2}>16 Jul 2021</Text>
        </View>
      </View>

      <Text style={styles.amount}>{service_amount}</Text>
    </LinearGradient>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  rowCont: {
    flexDirection: 'row',
  },
  bookingCardContainer: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  profilePic: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  h1: {
    fontWeight: 'bold',
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#333',
  },
  amount: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontWeight: 'bold',
    color: COLORS.warningGreen,
  },
});
