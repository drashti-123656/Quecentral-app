import React, {useState, useRef} from 'react';
import {StyleSheet, Text, Modal, View, Image, TextInput} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '@react-native-community/checkbox';
import {showMessage} from 'react-native-flash-message';
import {COLORS} from './../../utils/theme';
import AlertModel from './../../components/model/AlertModel';
import {CustomInput} from './../../components/input/CustomInput';
import LoginButton from './../../components/button/LoginButton';
import {signup as signupAPI} from './../../services/auth';
import {
  facebookLoginAction,
  googleLoginAction,
  login as signIn,
  reset,
} from './../../redux/actions/auth';
import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import {SignupSchema} from './../../utils/schema';
import InputPassword from './../../components/molecules/InputPassword';
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
import {generateOTP as generateOTPAPI} from './../../services/auth';
import OtpModel from './../../components/model/OtpModel';
import {checkLogintype as checkLogintypeAPI} from './../../services/auth';
import EStyleSheet from 'react-native-extended-stylesheet';

GoogleSignin.configure({
  webClientId:
    '627271039306-pmpu3n4npmlls97vkj0i9kunip66gr23.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true,
  access_type: 'offline', // if you want to access Google API on behalf of the user FROM YOUR SERVER
  accountName: '', // [Android] specifies an account name on the device that should be used
});

const Signup = ({navigation}) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const userInputRef = useRef();

  const [termsCondition, setTermsCondition] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertDisplay, setAlertDisplay] = useState(false);
  const [OtpView, setOtpView] = useState(false);

  const handleOtpSubmit = async otp => {
    const response = await checkLogintypeAPI();
    if (response.data.response.response_code === '200') {
      if (response.data.data.login_type === 'mobile') {
        let formData = new URLSearchParams({
          mobileno: userInputRef.current.mobileno,
          otp,
          country_code: '91',
        });
        dispatch(signIn(formData));
      } else {
        let formData = new URLSearchParams({
          email: userInputRef.current.email,
          password: userInputRef.current.password,
          login_type: 1,
        });

        dispatch(signIn(formData));
      }
    }
  };

  const genrateOtp = async () => {
    const generateOtpData = new URLSearchParams({
      //  usertype: 1,
      // device_id:
      //    'cc7cRipyIg8:APA91bGehTWOt96uZi-fLYeTaH3G1KNP_8HozxYiwd8YUwvGMqIz_W216kBcEq7wj64pkEj47NCThmhCFcR9o95iOhNaU68ygA0I-ZVniH3m7rJm9IRcLUcBdV-T8H66kvgR-oj-c2tD',
      device_type: 'android',
      mobileno: userInputRef.current.mobileno,
      country_code: 91,
      login_type: 1,
    });
    const response = await generateOTPAPI(generateOtpData);
  };

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

    const generateOtpData = new URLSearchParams({
      //  usertype: 1,
      // device_id:
      //    'cc7cRipyIg8:APA91bGehTWOt96uZi-fLYeTaH3G1KNP_8HozxYiwd8YUwvGMqIz_W216kBcEq7wj64pkEj47NCThmhCFcR9o95iOhNaU68ygA0I-ZVniH3m7rJm9IRcLUcBdV-T8H66kvgR-oj-c2tD',
      device_type: 'android',
      mobileno: formData.mobileno,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      country_code: 91,
      login_type: 1,
    });

    const response = await generateOTPAPI(generateOtpData);
    if (response.data.response.response_code == 200) {
      userInputRef.current = {
        //  usertype: 1,
        // device_id:
        //    'cc7cRipyIg8:APA91bGehTWOt96uZi-fLYeTaH3G1KNP_8HozxYiwd8YUwvGMqIz_W216kBcEq7wj64pkEj47NCThmhCFcR9o95iOhNaU68ygA0I-ZVniH3m7rJm9IRcLUcBdV-T8H66kvgR-oj-c2tD',
        device_type: 'android',
        mobileno: formData.mobileno,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        country_code: 91,
        login_type: 1,
      };
      setOtpView(true);
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
      const tokens = await GoogleSignin.getTokens();

      console.log('userInfo==>', userInfo);

      const data = {
        token: userInfo.idToken,
      };

      dispatch(googleLoginAction(data));

      // const response = await signupAPI(data);

      // if (response.data.response.response_code == 200 || 201) {
      //   //  setAlertDisplay(true);
      //   const URlEncodedData = new URLSearchParams({
      //     login_type: 3,
      //     email: userInfo.user.email,
      //     login_token: tokens.accessToken,
      //   });

      //   dispatch(signIn(URlEncodedData));
      // } else {
      //   setOtpView(true);
      //   showMessage({
      //     message: response.data.response.response_message,
      //     type: 'info',
      //     backgroundColor: COLORS.warningRed,
      //   });
      // }
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

  const handleFacebookLogin = data => {
    const {credentials: {token}} = data;
    const payload = {token}

    console.log('payload',payload)
      dispatch(facebookLoginAction(payload))
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
            color: EStyleSheet.value('$TEXT'),
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
                maxLength={10}
              />
              {errors.mobileno && touched.mobileno ? (
                <Text style={styles.error}>{errors.mobileno}</Text>
              ) : null}

              <InputPassword
                placeholder={'Password'}
                value={values.password}
                onChangeText={handleChange('password')}
                placeholderTextColor="#a1a1a1"
              />

              {errors.password && touched.password ? (
                <Text style={styles.error}>{errors.password}</Text>
              ) : null}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 10,
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
                  <Text style={{color: EStyleSheet.value('$PRIMARY')}}>terms</Text> and
                  <Text style={{color: EStyleSheet.value('$PRIMARY')}}> privacy policy </Text>
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

        <View style={styles.GoogleFacebookContainer}>
          <GoogleSigninButton
            style={{width: '100%', height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleSignInGoogle}
          />

          <Text style={{fontWeight: 'bold', textAlign: 'center', padding: 5}}>
            {' '}
            OR{' '}
          </Text>
          <FBLogin
            ref={inputRef}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            permissions={['email']}
            onLogin={handleFacebookLogin}
            onLogout={function () {
              console.log('Logged out.');
              //     _this.setState({ user : null });
            }}
            onLoginFound={function (data) {
              console.log('Existing login found.');
              console.log(data);
              //  _this.setState({ user : data.credentials });
            }}
            onLoginNotFound={function () {
              console.log('No user logged in.');
              //  _this.setState({ user : null });
            }}
            onError={function (data) {
              console.log('ERROR');
              console.log(data);
            }}
            onCancel={function () {
              console.log('User cancelled.');
            }}
            onPermissionsMissing={function (data) {
              console.log('Check permissions!');
              console.log(data);
            }}
          />
        </View>

        <Text style={{  color: EStyleSheet.value('$TEXT'), textAlign: 'center', marginBottom: 30, marginTop: 10}}>
          Already have an account?{' '}
          <Text
            onPress={() => navigation.navigate('EmailLogin')}
            style={{ color: EStyleSheet.value('$PRIMARY'), fontWeight: 'bold'}}>
            Login
          </Text>
        </Text>
      </View>

      <OtpModel
        display={OtpView}
        setDisplay={setOtpView}
        handleOtpSubmit={handleOtpSubmit}
        genrateOtp={genrateOtp}
      />
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$PRIMARY',
    flex: 1,
  },
  headerCont: {
    height: 190,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleText: {
    color: '$WHITE',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '$BACKGROUND',
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
  GoogleFacebookContainer: {
    marginHorizontal: '20%',
  },
  TermsCondition:{
    color: '$TEXT'
  }
});
