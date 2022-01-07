import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const PhoneNumberInput = ({
  value,
  placeholder,
  onChangeText,
  title = '',
  editable = true,
  style
}) => {
  return (
    <View >
      {title !== '' && <Text style={styles.text}>{title}</Text>}
    
        <View style={styles.inputcontainer}> 
         
        <Text style={styles.countryCode}> Ind (+91) </Text>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType="numeric"
          editable={editable}
          keyboardType="numeric"
          maxLength={10}
          style={style}
        />
      </View>
    </View>
  );
};

export default PhoneNumberInput;

const styles = StyleSheet.create({
  inputcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#2BBBA0',
    marginTop: 12,
    marginBottom: 12,
    
  },
  container: {
   
  },
  text: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
 
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
  },
  countryCode: {
    padding: 10,
    borderRightWidth: 2,
    borderColor: '#2BBBA0',
    fontWeight: '700',
  },
});
