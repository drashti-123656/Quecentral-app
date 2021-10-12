import React, {useState} from 'react';
import {StyleSheet, Text, Modal, View, Image, TextInput} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
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
import {Formik} from 'formik'; 
import {SignupSchema} from './../../utils/schema';

GoogleSignin.configure();

GoogleSignin.configure({
  
  webClientId: '627271039306-pmpu3n4npmlls97vkj0i9kunip66gr23.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  accountName: '', // [Android] specifies an account name on the device that should be used
 });

const Signup = ({navigation}) => {
  const dispatch = useDispatch();

  const [termsCondition, setTermsCondition] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertDisplay, setAlertDisplay] = useState(false);

  const handleSignUp = async formData => {
    if (!termsCondition) {
      showMessage({
        message: 'Please check privacy policy checkbox ',
        type: 'info',
        backgroundColor: COLORS.warningRed,
      });
      return;
    }
    setLoading(true);

    const data = new URLSearchParams({
      //  usertype: 1,
      // device_id:
      //    'cc7cRipyIg8:APA91bGehTWOt96uZi-fLYeTaH3G1KNP_8HozxYiwd8YUwvGMqIz_W216kBcEq7wj64pkEj47NCThmhCFcR9o95iOhNaU68ygA0I-ZVniH3m7rJm9IRcLUcBdV-T8H66kvgR-oj-c2tD',
      device_type: 'android',
      mobileno: formData.mobileno,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      country_code: 91,
    });

    const response = await signupAPI(data);

    if (response.data.response.response_code == 200) {
    //  setAlertDisplay(true);
      const URlEncodedData = new URLSearchParams({
        email: formData.email,
        password: formData.password,
      });

      dispatch(signIn(URlEncodedData));
    } else {
      showMessage({
        message: response.data.response.response_message,
        type: 'info',
        backgroundColor: COLORS.warningRed,
      });
    }

    setLoading(false);
  };


  const handleSignInGoogle = async () => {
    try { 
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
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
        <AlertModel
          alertDisplay={alertDisplay}
          setAlertDisplay={setAlertDisplay}
        
        />

        <Text
          style={{
            ...styles.TitleText,
            color: '#333',
            marginTop: 30,
            marginBottom: 10,
          }}>
          Signup
        </Text>

        <Formik
          initialValues={{name: '', email: '', mobileno: '', password: ''}}
          validationSchema={SignupSchema}
          onSubmit={values => handleSignUp(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            errors,
            values,
          }) => (
            <View>
              <CustomInput
                placeholder={'Enter name'}
                value={values.name}
                onChangeText={handleChange('name')}
              />
              {errors.name && touched.name ? (
                <Text style={styles.error}>{errors.name}</Text>
              ) : null}

              <CustomInput
                placeholder={'Enter email'}
                value={values.email}
                onChangeText={handleChange('email')}
              />
              {errors.email && touched.email ? (
                <Text style={styles.error}>{errors.email}</Text>
              ) : null}

              <CustomInput
                placeholder={'Enter mobile number'}
                value={values.mobileno}
                onChangeText={handleChange('mobileno')}
                keyboardType="numeric"
              />
              {errors.mobileno && touched.mobileno ? (
                <Text style={styles.error}>{errors.mobileno}</Text>
              ) : null}

              <CustomInput
                placeholder={'Password'}
                value={values.password}
                onChangeText={handleChange('password')}
              />
              {errors.password && touched.password ? (
                <Text style={styles.error}>{errors.password}</Text>
              ) : null}

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
                  I agree to the{' '}
                  <Text style={{color: COLORS.PRIMARY}}>terms</Text> and
                  <Text style={{color: COLORS.PRIMARY}}> privacy policy </Text>
                </Text>
              </View>

              <View style={{margin: 12}}>
                <LoginButton
                  title={'Signup'}
                  loading={loading}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>

        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleSignInGoogle}
        />

        <Text style={{textAlign: 'center', marginBottom: 30}}>
          Already have an account ?
          <Text
            onPress={() => navigation.navigate('EmailLogin')}
            style={{color: '#2BBBA0', fontWeight: 'bold'}}>
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
  error: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.warningRed,
    marginHorizontal: 12,
    textAlign: 'right',
  },
});
