import {Text, View, Switch} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

const CustomHeader = ({title, headerRight, headerLeft}) => {
  return (
    <View style={styles.conainer}>
      <Text style={styles.title}>{title}</Text>
      <Switch trackColor={'white'} thumbColor={'white'}/>
    </View>
  );
};

export default CustomHeader;

const styles = EStyleSheet.create({
  conainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    padding: 10,
  },
  title:{
      fontSize:18,
      fontWeight:'bold',
      color:'$WHITE'
  }
});
