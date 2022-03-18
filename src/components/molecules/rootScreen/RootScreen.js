import {ScrollView, Text, View} from 'react-native';
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
      <ScrollView style={styles.childrenContainer}>{children}</ScrollView>
    </View>
  );
};

export default RootScreen;

const styles = EStyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: '$BACKGROUND',
  },
  headerBar: {
    height: 100,
    padding: 10,
    backgroundColor: '$PRIMARY',
  },
  childrenContainer:{
    flex:1,
    position:'absolute',
    top: 50,
    left:10,
    bottom:0,
    right:10
  }
});
