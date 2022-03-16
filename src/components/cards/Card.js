import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from './../../utils/theme';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';

const Card = props => {
  return (
    <LinearGradient
      pointerEvents={'none'}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[EStyleSheet.value('$ALPHA_PRIMARY'), EStyleSheet.value('$CARD_BACKGROUND') , EStyleSheet.value('$CARD_BACKGROUND')]}
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
  },
});
