import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {COLORS} from './../../utils/theme';

const AlertModel = ({alertDisplay, setAlertDisplay, onPressOkay}) => {
  return (
    <Modal animationType="fade" visible={alertDisplay}  transparent={true}>
        <View style={{flex:1, justifyContent:'center'}}>
          <View style={{height:'100%', width:'100%', opacity:0.4, backgroundColor:'#222', position:'absolute'}}></View>
      <View style={styles.modalCont}>
        <Image
          source={require('./../../assets/icons/check.png')}
          style={{width: 60, height: 60, alignSelf: 'center', marginBottom: 30}}
        />
        <Text style={styles.h1}>You Have been successfully resgistered</Text>
        <TouchableOpacity 
        onPress={onPressOkay}
        style={styles.okayBttn}>
          <Text
            style={styles.okayBttnText}>
            Okay
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </Modal>
  );
};

export default AlertModel;

const styles = StyleSheet.create({
  modalCont: {
    padding: 10,
    flex:0.4,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  h1: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  h2: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  okayBttn: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 30,
    paddingVertical:10,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 30,
  },
  okayBttnText:{color: '#fff', textAlign: 'center', fontWeight: 'bold'}
});
