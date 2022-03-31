import {Text, View, Switch} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const HeaderLeft = ({showNav, title}) => {
  const handleNavPress = () => {
    navigation.goBack()
  }
  const navigation = useNavigation();
  return(
  
  <View style={styles.rightHeader}>
    {showNav && (
      <Icon
        name="keyboard-arrow-left"
        size={30}
        color={EStyleSheet.value('$WHITE')}
        onPress={handleNavPress}
        style={styles.navButton}
      />
    )}
    <Text style={styles.title}>{title}</Text>
  </View>
);}

const CustomHeader = ({title, headerRight, headerLeft, showNav = true}) => {
  return (
    <View style={styles.conainer}>
      {headerLeft ? headerLeft :  <HeaderLeft showNav={showNav} title={title}/>}
      {headerRight ? headerRight :  null}
    </View>
  );
};

export default CustomHeader;

const styles = EStyleSheet.create({
  conainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '$WHITE',
  },
  navButton:{
    marginRight:10
  }
});
