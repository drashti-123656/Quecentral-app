import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';

const InputPassword = (props) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.rowCont}>
        <TextInput
          style={{
            ...styles.input, 
            height: props.height ? props.height : 50,
          }}
          onChangeText={props.onChangeText}
          value={props.value}
          placeholder={props.placeholder}
          editable={props.editable}
          multiline={props.multiline}
          placeholderTextColor="#a1a1a1"
          secureTextEntry={secureText}
        />
        <TouchableOpacity
        onPress={() => setSecureText(!secureText)}>
        <Image
          source={secureText? require('./../../assets/icons/hidden.png') : require('./../../assets/icons/eye.png')}
          style={styles.image}
        />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowCont: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#2BBBA0',
    borderWidth: 1,
    margin: 12,
    marginVertical: 0,
    height: 50,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  input: {
    padding: 10,
    borderRadius: 10,
    color: '#000',
    flex:1
  },
  image: {
    width: 25,
    height: 25,
    marginHorizontal:10
  },
});
