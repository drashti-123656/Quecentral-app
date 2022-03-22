import React from 'react';
import {Text, View, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const NoResultFound = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/icons/not-found.png')}
        style={styles.Image}
        tintColor={EStyleSheet.value('$PRIMARY')}
      />
      <Text style={styles.h1}>No results found</Text>
    </View>
  );
};

export default NoResultFound;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '$TEXT'
  },
  Image: {
    width: 50,
    height: 50,
    marginBottom:10
  },
});
