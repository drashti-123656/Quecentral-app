import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const CustomInput = ({ value, onChangeText, placeholder }) => {
    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
            />
        </View>
    )
}

const CustomInputWithTitle = ({ title, value, onChangeText, placeholder, editable }) => {
    return (
        <View style={{width:'100%'}}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={{...styles.input,  
                    borderColor:'#2BBBA0',
                    height: 50,
                    borderRadius:10, 
                    margin:0,
                    marginVertical: 5,
                }}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                editable={editable}
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
