import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {COLORS} from '../../utils/theme';

const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
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
        multiline={props.multiline}
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
          }}
          onChangeText={props.onChangeText}
          value={props.value}
          placeholder={props.placeholder}
          editable={props.editable}
          multiline={props.multiline}
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

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#2BBBA0',
  },
});
