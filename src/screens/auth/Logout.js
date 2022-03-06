import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {COLORS} from './../../utils/theme';

const Logout = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={COLORS.PRIMARY} />
    </View>
  );
};

const styles = StyleSheet.create({
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
