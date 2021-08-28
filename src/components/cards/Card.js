import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from './../../utils/theme';
import LinearGradient from 'react-native-linear-gradient';

const Card = props => {
  return (
    <LinearGradient
      pointerEvents={'none'}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#E6FFF9', '#F3FFFD', '#fff']}
      style={{...styles.container, ...props.style}}>
      {props.children}
    </LinearGradient>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
});
