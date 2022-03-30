import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  facebookLoginAction,
  googleLoginAction,
  handleCloseModalAction,
  login as signIn,
  reset,
  sendOtpAction,
  verifyOtpAction,
} from './../../redux/actions/auth';
import LoginButton from './../../components/button/LoginButton';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {COLORS} from './../../utils/theme';
import {
  generateOTP as generateOTPAPI,
  login as loginAPI,
} from './../../services/auth';
import {CustomInput} from '../../components/input/CustomInput';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Formik} from 'formik';
import OtpModel from '../../components/model/OtpModel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = ({route, navigation}) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const userInputRef = useRef();
  const {error, errorMsg, showOtpModal, authData} = useSelector(
    ({auth}) => auth,
  );

  const [otpSent, setOtpSent] = useState(false);
  const [mobileno, setMobileno] = useState('');
  const [otp, setOtp] = useState('');
  const [country_code, setCountry_code] = useState(91);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async values => {
    const payload = {mobile_no: values.mobileno};
    dispatch(sendOtpAction(payload));
  };

  const closeOtpModal = () => {
    dispatch(handleCloseModalAction());
  };

  const handleVerifyOtp = async otp => {
    if (authData.facebookId) {
      const payload = {
        token: authData.facebookId,
        mobile_no: authData.mobileNo,
        otp,
      };
      dispatch(facebookLoginAction(payload));
    } else if (authData.googleId) {
      const payload = {
        token: authData.googleId,
        mobile_no: authData.mobileNo,
        otp,
      };
      dispatch(googleLoginAction(payload));
    } else {
      const payload = {
        mobile_no: authData.mobileNo,
        otp,
      };
      dispatch(verifyOtpAction(payload));
    }
  };

  const genrateOtp = () => {};

  useEffect(() => {
    if (error) {
      showMessage({
        message: errorMsg,
        type: 'info',
        backgroundColor: COLORS.warningRed,
      });
      //dispatch(reset());
    }
  }, [error, errorMsg]);


  const handleSignInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      const data = {
        token: userInfo.idToken,
      };
      dispatch(googleLoginAction(data));
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
      dispatch(facebookLoginAction(payload))
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.headerCont}>
          <Image
            source={require('./../../assets/icons/icon.png')}
            style={styles.imageIcon}
          />
          <Text style={styles.TitleText}>Queue Central</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text
            style={{
              ...styles.TitleText,
              color: EStyleSheet.value('$TEXT'),
              marginBottom: 20,
            }}>
              {authData.facebookId || authData.googleId ? 'One More Step...' : 'Login'}
          </Text>

          <Formik
            initialValues={{mobileno: ''}}
            onSubmit={values => handleSendOtp(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View>
                <CustomInput
                  placeholder={'Enter mobile number'}
                  onChangeText={handleChange('mobileno')}
                  onBlur={handleBlur('mobileno')}
                  value={values.mobileno}
                  style={styles.input}
                  keyboardType={'numeric'}
                  placeholderTextColor="#a1a1a1"
                />

                {/* <TouchableOpacity
                  onPress={() => setOtpSent(false)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: 12,
                  }}>
                  <Icon
                    name="refresh"
                    size={25}
                    color={EStyleSheet.value('$PRIMARY')}
                  />

                  <Text style={styles.footerText}>
                    Didn't recieve the otp? Send OTP
                  </Text>
                </TouchableOpacity> */}

                <View style={styles.loginContainer}>
                  <LoginButton
                    title={'Send OTP'}
                    onPress={handleSubmit}
                    loading={loading}
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

          <Text
            style={{
              textAlign: 'center',
              color: EStyleSheet.value('$TEXT'),
              marginTop: 10,
            }}>
            Don't have an account ?{' '}
            <Text
              onPress={() => navigation.navigate('Signup')}
              style={styles.bottomText}>
              Signup
            </Text>
          </Text>
        </View>

        <OtpModel
          display={showOtpModal}
          setDisplay={closeOtpModal}
          handleOtpSubmit={handleVerifyOtp}
          genrateOtp={genrateOtp}
        />
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$PRIMARY',
    flex: 1,
    justifyContent: 'flex-end',
  },
  GoogleFacebookContainer: {
    marginHorizontal: '20%',
    marginTop: 20
  },
  headerCont: {
    height: 190,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginContainer: {
    margin: 12,
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: '$BACKGROUND',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color:'$TEXT',
    borderRadius: 10,
    borderColor: '$PRIMARY',
  },
  footerText: {
    textAlign: 'right',
    paddingLeft: 3,
    color: '$TEXT',
  },
  bottomText: {
    color: '$PRIMARY',
    fontWeight: 'bold',
  },
  imageIcon: {
    width: 60,
    height: 70,
  },
});
