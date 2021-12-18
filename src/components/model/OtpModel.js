import React from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const OtpModel = ({display, setDisplay, handleOtpSubmit, genrateOtp}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={display}>
      <View style={styles.container}>
        <View
          style={{
            height: '100%',
            width: '100%',
            opacity: 0.4,
            backgroundColor: '#222',
            position: 'absolute',
          }}></View>
        <View style={styles.bodyContainer}>
          <TouchableOpacity style={styles.closeBttn} onPress={() => setDisplay(!display)}>
            <Text style={{color:'#fff'}}>X</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Enter OTP</Text>
          <OTPInputView
            pinCount={4}
            style={styles.otpView}
            codeInputFieldStyle={styles.underlineStyleBase}
            onCodeFilled={value => {
              handleOtpSubmit(value);
            }}
          />
          <TouchableOpacity onPress={() => genrateOtp()}>
          <Text style={styles.text}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OtpModel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpView: {
    width: '80%',
    height: 200,
    color: 'black',
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: 'black',
    borderBottomColor: '#17BED0',
  },
  bodyContainer: {
    width: '90%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    marginTop: 20,
  },
  text: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeBttn:{
    position: 'absolute',
    height:25,
    width:25,
    top:10,
    right:10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red',
    borderRadius:50
  }
});
