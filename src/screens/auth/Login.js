import React, {useState, useEffect} from 'react';
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

const Login = ({route, navigation}) => {
  const dispatch = useDispatch();

  const {error, errorMsg, showOtpModal} = useSelector(({auth}) => auth);

  const [otpSent, setOtpSent] = useState(false);
  const [mobileno, setMobileno] = useState('');
  const [otp, setOtp] = useState('');
  const [country_code, setCountry_code] = useState(91);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async values => {
    const {token} = route.params;
    const payload = {mobile_no: values.mobileno, token};
    dispatch(sendOtpAction(payload));
  };

  const closeOtpModal = () => {
    dispatch(handleCloseModalAction());
  };

  const handleOtpSubmit = async otp => {
    const payload = {
      token,
      mobile_no: '961111111',
      otp,
    };
    dispatch(verifyOtpAction(payload));
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
              color: '#333',
              marginTop: 50,
              marginBottom: 20,
            }}>
            Login
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
                />

                <TouchableOpacity
                  onPress={() => setOtpSent(false)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding : 12,
                  }}>
                 

                  <Icon
                    name="refresh"
                    size={25}
                    color={EStyleSheet.value('$PRIMARY')}
                   
                  />

                  <Text style={styles.footerText}>
                    Didn't recieve the otp? Send OTP
                  </Text>
                </TouchableOpacity>

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

          <Text
            style={{textAlign: 'center', color: EStyleSheet.value('$TEXT')}}>
            Don't have an account ?
            <Text
              onPress={() => navigation.navigate('Signup')}
              style={styles.bottomText}>
              {' '}
              Signup
            </Text>
          </Text>
        </View>

        <OtpModel
          display={showOtpModal}
          setDisplay={closeOtpModal}
          handleOtpSubmit={handleOtpSubmit}
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
  loginContainer: {
    margin: 12,
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: '$BACKGROUND',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '$PRIMARY',
  },
  footerText: {
    textAlign: 'right',
    paddingLeft : 3,
    color: '$TEXT',
  },
  bottomText: {
    color: '#2BBBA0',
    fontWeight: 'bold',
  },
  imageIcon: {
    width: 60,
    height: 70,
  },
  
});
