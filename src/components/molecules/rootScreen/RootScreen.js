import {Text, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

const RootScreen = ({children}) => {
  return (
    <View style={EStyleSheet.flatten([styles.rootScreen])}>
      <View style={styles.headerBar}>
        <Text style={{...styles.h1, color: '#fff', marginLeft: 10}}>
          Search Service
        </Text>
      </View>
      <View>{children}</View>
    </View>
  );
};

export default RootScreen;

const styles = EStyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: '$PRIMARY',
  },
  headerBar: {
    height: 50,
    justifyContent: 'center',
  },
});
