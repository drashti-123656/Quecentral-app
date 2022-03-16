import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {COLORS} from './../../utils/theme';

const Logout = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={EStyleSheet.value('$PRIMARY')} />
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    width: 40,
    height: 40,
  },
});

export default Logout;
