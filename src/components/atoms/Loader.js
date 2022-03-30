import {StyleSheet, ActivityIndicator, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={EStyleSheet.value('$PRIMARY')} size={'large'} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container:{justifyContent: 'center', alignItems: 'center', flex: 1}
});
