import {Text, Pressable} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

const Button = ({title, loading, style, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={EStyleSheet.flatten([styles.container, style])}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '$PRIMARY',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
  },
  title: {
    color: '$WHITE',
    fontWeight: 'bold',
  },
});
