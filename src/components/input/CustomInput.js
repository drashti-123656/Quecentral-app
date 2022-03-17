import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const CustomInput = (props) => {
  const {
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    TextInputstyle
  } = props;

  return (
    <View>
      <TextInput
        style={[styles.input, props.TextInputstyle]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        {...props}
      />
    </View>
  );
};

const CustomInputWithTitle = props => {
  return (
    <View style={{flex: 1}}>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput
        style={{
          ...styles.input,
          borderColor: '#2BBBA0',
          height: props.height ? props.height : 50,
          borderRadius: 10,
          margin: 0,
          marginVertical: 5,
        }}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        editable={props.editable}
        keyboardType={props.keyboardType}
        multiline={props.multiline}
        placeholderTextColor="#a1a1a1"
      />
    </View>
  );
};

const CouponInputWithTitle = props => {
  return (
    <View style={{flex: 1}}>
      <Text style={styles.title}>{props.title}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          ...styles.input,
          borderColor: '#2BBBA0',
          height: props.height ? props.height : 50,
          borderRadius: 10,
          margin: 0,
          marginVertical: 5,
          padding: 0,
          paddingHorizontal: 10,
        }}>
        <TextInput
          style={{
            flex: 1,
            padding: 10,
            color:'#000'
          }}
          onChangeText={props.onChangeText}
          value={props.value}
          placeholder={props.placeholder}
          editable={props.editable}
          multiline={props.multiline}
          placeholderTextColor="#a1a1a1"
        />
        {props.couponError === 'couponISAvailable' ? (
          <Image
            source={require('./../../assets/icons/check.png')}
            style={{width: 20, height: 20}}
          />
        ) : props.couponError === '' ? (
          <Text></Text>
        ) : (
          <Image
            source={require('./../../assets/icons/exclamation.png')}
            style={{width: 20, height: 20}}
          />
        )}
      </View>
    </View>
  );
};

export {CustomInput, CustomInputWithTitle, CouponInputWithTitle};

const styles = EStyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop:15,
    color : '$TEXT'
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '$PRIMARY',
    color:'$TEXT',
    backgroundColor: '$CARD_BACKGROUND',
  },
});
