import {StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SearchBar = ({value, onChangeText}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('FindAProfessional')
      }
      style={{...styles.rowCont, ...styles.search}}>
      <TextInput
        style={styles.textInputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search Service"
        placeholderTextColor="#a1a1a1"
        editable={false}
      />
        <Image
          source={require('./../../assets/icons/search.png')}
          style={styles.imageStyle}
        />
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  rowCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    position: 'absolute',
    width: '100%',
    height: 50,
    top: -25,
    paddingHorizontal: 10,
    zIndex: 1,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 8,
  },
  textInputStyle: {flex: 1, color: '#000'},
  imageStyle: {width: 25, height: 25},
});
