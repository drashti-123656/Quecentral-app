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

const CustomInputWithTitle = ({ title, value, onChangeText, placeholder }) => {
    return (
        <View style={{flex:1}}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={{...styles.input,  
                    borderColor:'#a1a1a1',  
                    borderRadius:5, 
                    height: 40,
                    margin: 5,
                }}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
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
