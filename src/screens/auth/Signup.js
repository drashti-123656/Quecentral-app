import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '@react-native-community/checkbox';
import {COLORS} from './../../utils/theme';
import {CustomInput} from './../../components/input/CustomInput';
import LoginButton from './../../components/button/LoginButton';

const Signup = ({navigation}) => {
  const [termsCondition, setTermsCondition] = useState(false);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={styles.container}>
      <View style={styles.headerCont}>
        <Image
          source={require('./../../assets/icons/icon.png')}
          style={{width: 60, height: 70}}
        />
        <Text style={styles.TitleText}>Queue Central</Text>
      </View>

      <View style={styles.bodyContainer}>
        <Text
          style={{
            ...styles.TitleText,
            color: '#333',
            marginTop: 30,
            marginBottom: 10,
          }}>
          Signup
        </Text>
        <CustomInput placeholder={'Enter mobile number'} />
        <CustomInput placeholder={'Password'} />
        <CustomInput placeholder={'Password'} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            marginLeft: 12,
          }}>
          <CheckBox
            disabled={false}
            value={termsCondition}
            onValueChange={newValue => setTermsCondition(newValue)}
            tintColors={{true: COLORS.PRIMARY, false: COLORS.PRIMARY}}
            tintColor={COLORS.PRIMARY} // for IOS
            boxType={'square'} // for IOS
            onCheckColor={COLORS.PRIMARY}
            onTintColor={COLORS.PRIMARY}
          />
          <Text style={styles.TermsCondition}>
            I agree to the <Text style={{color: COLORS.PRIMARY}}>terms</Text>{' '}
            and<Text style={{color: COLORS.PRIMARY}}> privacy policy </Text>
          </Text>
        </View>

        <View style={{margin: 12}}>
          <LoginButton title={'Signup'} />
        </View>

        <Text style={{textAlign: 'center'}}>
          Already have an account ?
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{color: '#2BBBA0', fontWeight: 'bold'}}>
            {' '}
            Login
          </Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2BBBA0',
    flex: 1,
  },
  headerCont: {
    height: 190,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
