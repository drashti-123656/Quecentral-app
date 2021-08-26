import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from './../../utils/theme';
import Stars from './../review/Stars';

const ReviewCard = () => {
  return (
    <LinearGradient
      pointerEvents={'none'}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#E6FFF9', 'transparent', '#fff']}
      style={styles.container}>
      <Image
        source={require('./../../assets/images/service01.jpg')}
        style={styles.serviceImage}
      />
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={{...styles.h1, marginBottom: 5}}>Car washing</Text>
        <Text style={{...styles.h2, marginBottom: 5}}>
          July 19, 2021 15:27 pm
        </Text>
        <View
          style={{...styles.rowCont, alignItems: 'center', marginBottom: 5}}>
          <Image
            source={require('./../../assets/icons/user.png')}
            style={styles.profilePic}
          />
          <Text style={{...styles.h2, marginLeft: 10}}>Nithya User</Text>
        </View>
        <Stars />
      </View>
    </LinearGradient>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  rowCont: {
    flexDirection: 'row',
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
    fontSize: 15,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#333',
  },
});
