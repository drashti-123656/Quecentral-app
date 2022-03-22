import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from './../../utils/theme';
import Stars from './../../components/review/Stars';
import LinearGradient from 'react-native-linear-gradient';
import {BASE_URL} from './../../utils/global';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Feather';

const ProviderDetails = ({style, image, name, email}) => {
  const navigation = useNavigation();

  return (
    <View style={{...styles.container, ...style}}>
      <Text style={{...styles.h1, marginBottom: 5}}>Provider Details</Text>

      <View style={{...styles.rowCont, alignItems: 'flex-start'}}>
        <Image
          source={{uri: `${BASE_URL}${image}`}}
          style={{width: 40, height: 40, borderRadius: 50}}
        />
        <View style={{marginLeft: 10}}>
          <Text style={styles.h1}>{name}</Text>
          <View style={styles.rowCont}>
            <Icon
              name="home"
              size={15}
              color={EStyleSheet.value('$PRIMARY')}
              //marginRight= {10}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Text style={styles.h3}>{email}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProviderDetails;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$CARD_BACKGROUND',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  rowCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  h1: {
    fontWeight: 'bold',
    color: '$TEXT',
  },
  h3: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '$TEXT',
    paddingLeft: 7,
  },
});
