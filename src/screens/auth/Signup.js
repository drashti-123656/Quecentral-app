import React, {useState} from 'react';
import {StyleSheet, Text, Modal, View, Image, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '@react-native-community/checkbox';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {COLORS} from './../../utils/theme';
import AlertModel from './../../components/model/AlertModel';
import {CustomInput} from './../../components/input/CustomInput';
import LoginButton from './../../components/button/LoginButton';
import {signup as signupAPI} from './../../services/auth';
import {login as signIn, reset} from './../../redux/actions/auth';
import {useSelector, useDispatch} from 'react-redux';

const Signup = ({navigation}) => {
  const dispatch = useDispatch();

  const [termsCondition, setTermsCondition] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileno, setMbileno] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertDisplay , setAlertDisplay] = useState(false);

  const handleSignUp = async () => {

    if(!termsCondition){
      setAlertDisplay(true)
      return
    }
    setLoading(true);

    let formData = new URLSearchParams({
    //  usertype: 1,
     // device_id:
    //    'cc7cRipyIg8:APA91bGehTWOt96uZi-fLYeTaH3G1KNP_8HozxYiwd8YUwvGMqIz_W216kBcEq7wj64pkEj47NCThmhCFcR9o95iOhNaU68ygA0I-ZVniH3m7rJm9IRcLUcBdV-T8H66kvgR-oj-c2tD',
      device_type: 'android',
      mobileno,
      name,
      email,
      password,
      country_code: 91,
    });

    const response = await signupAPI(formData);

    if (response.data.response.response_code == 200) {
      setAlertDisplay(true)
    } else {
      showMessage({
        message: response.data.response.response_message,
        type: 'info',
        backgroundColor: COLORS.warningRed,
      });
    }

    setLoading(false);
  };

  const login = async() => {
    setLoading(true);

    let formData = new URLSearchParams({
        email,
        password
    });

    dispatch(signIn(formData));

 
  };

  

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
        <AlertModel alertDisplay={alertDisplay} setAlertDisplay={setAlertDisplay} onPressOkay={login} />

        <Text
          style={{
            ...styles.TitleText,
            color: '#333',
            marginTop: 30,
            marginBottom: 10,
          }}>
          Signup
        </Text>

        <CustomInput placeholder={'Enter name'} value={name} onChangeText={setName} />
        <CustomInput placeholder={'Enter email'} value={email} onChangeText={setEmail} />
        <CustomInput placeholder={'enter mobile number'} value={mobileno} onChangeText={setMbileno} />
        <CustomInput placeholder={'Password'} value={password} onChangeText={setPassword} />

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
          <LoginButton
            title={'Signup'}
            loading={loading}
            onPress={handleSignUp}
          />
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
