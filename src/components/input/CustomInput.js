import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const CustomInput = ({ value, onChangeText, placeholder, keyboardType='default' }) => {
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
    )
}

const CustomInputWithTitle = props => {
    return (
        <View style={{flex:1}}>
            <Text style={styles.title}>{props.title}</Text>
            <TextInput
                style={{...styles.input,  
                    borderColor:'#2BBBA0',
                    height: props.height ? props.height : 50,
                    borderRadius:10, 
                    margin:0,
                    marginVertical: 5,
                }}
                onChangeText={props.onChangeText}
                value={props.value}
                placeholder={props.placeholder}
                editable={props.editable}
                multiline={props.multiline}
            />
        </View>
    )
}

export { CustomInput, CustomInputWithTitle }

const styles = StyleSheet.create({
    title:{
        fontSize:12,
        fontWeight:'bold'
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:10,
        borderColor:'#2BBBA0'
      },
})
