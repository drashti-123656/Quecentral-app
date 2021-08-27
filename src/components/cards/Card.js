import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from './../../utils/theme';

const Card = props => {
  return <View style={styles.container}>{props.childern}</View>;
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
