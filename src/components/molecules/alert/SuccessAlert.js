import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import {COLORS} from '../../../utils/theme';
import {BlurView, VibrancyView} from '@react-native-community/blur';

const SuccessAlert = ({visible, message, onPressOkay}) => {
  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <BlurView
          style={{
            height: '100%',
            width: '100%',
            opacity: 0.9,
            position: 'absolute',
          }}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="black"></BlurView>
        <View style={styles.modalCont}>
        <Image
              source={require('./../../../assets/icons/check.png')}
              style={{
                width: 60,
                height: 60,
                alignSelf: 'center',
                marginBottom: 30,
              }}
            />
          <Text style={styles.h1}>{message}</Text>
          <Pressable onPress={onPressOkay} style={styles.okayBttn}>
            <Text
              style={{color: '#fff', textAlign: 'center', fontWeight: 'bold'}}>
              Okay
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessAlert;

const styles = StyleSheet.create({
  modalCont: {
    padding: 10,
    flex: 0.4,
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
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 30,
  },
});
