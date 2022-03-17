import React from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from './../../utils/theme';
import {BASE_URL} from './../../utils/global';
import Stars from './../../components/review/Stars';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const ServiceCard = ({
  service_id,
  image,
  location,
  service_title,
  mobileno,
  service_amount,
  currency,
  ratings,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ServiceDetails', {
          serviceId: service_id,
        })
      }>
      <LinearGradient
        pointerEvents={'none'}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[
          EStyleSheet.value('$ALPHA_PRIMARY'),
          EStyleSheet.value('$CARD_BACKGROUND'),
          EStyleSheet.value('$CARD_BACKGROUND'),
        ]}
        style={styles.container}>
        <Image
          source={{uri: `${BASE_URL}${image}`}}
          style={{width: 70, height: 70, borderRadius: 5}}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={styles.h1}>{service_title}</Text>

          <Stars rating={ratings} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{...styles.rowCont}}>
              <Icon
                name="location-pin"
                size={15}
                color='red'
                PlaceholderContent={<ActivityIndicator />}
              />
              <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.h3}>
                {location}
              </Text>
            </View>
          </View>
          <Text
            style={{
              ...styles.h1,
              position: 'absolute',
              top: 0,
              right: 5,
              color: EStyleSheet.value('$PRIMARY'),
            }}>{`${currency} ${service_amount}`}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '$CARD_BACKGROUND',
    marginBottom: 10,
  },
  rowCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    flex: 1,
  },
  h1: {
    fontWeight: 'bold',
    marginBottom: 7,
    color: '$TEXT',
  },
  h3: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '$TEXT'
  },
});
