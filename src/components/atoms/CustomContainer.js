import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';

const CustomContainer = ({bg, onPress, children}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, bg]}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default CustomContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '$BG_COLOR',
    flex: 1,
  },
});
