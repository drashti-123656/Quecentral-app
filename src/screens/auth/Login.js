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
import {login as signIn, reset} from './../../redux/actions/auth';
import LoginButton from './../../components/button/LoginButton';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {COLORS} from './../../utils/theme';
import {generateOTP as generateOTPAPI, login as loginAPI} from './../../services/auth';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {error, errorMsg} = useSelector(state => state.miscData);

  const [otpSent, setOtpSent] = useState(false);
  const [mobileno, setMobileno] = useState('');
  const [otp, setOtp] = useState('');
  const [country_code, setCountry_code] = useState(91);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    if (!otpSent) {
      let generateOtpData = new URLSearchParams({
        device_type: 'android',
        mobileno,
        country_code: 91,
        login_type: 1,
      });

      let response = await generateOTPAPI(generateOtpData);
      console.log(response.data.response.response_code);
      if (response.data.response.response_code == 200) {
        showMessage({
          message: response.data.response.response_message,
          type: 'info',
          backgroundColor: COLORS.warningGreen,
        });

        setOtpSent(true);
      } else {
        showMessage({
          message: response.data.response.response_message,
          type: 'info',
          backgroundColor: COLORS.warningRed,
        });
      }
    } else {
      let formData = new URLSearchParams({
        mobileno,
        otp,
        country_code,
      });
      dispatch(signIn(formData));
    }

    setLoading(false);
  };

  useEffect(() => {
    if (error) {
      showMessage({
        message: errorMsg,
        type: 'info',
        backgroundColor: COLORS.warningRed,
      });
      dispatch(reset());
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

          <TextInput
            style={styles.input}
            value={mobileno}
            placeholder={'Enter mobile number'}
            onChangeText={setMobileno}
            keyboardType="numeric"
          />

          <View style={{opacity: otpSent ? 1 : 0.2}}>
            <TextInput
              style={styles.input}
              value={otp}
              placeholder={'Enter OTP'}
              onChangeText={setOtp}
              editable={otpSent}
            />
          </View>

          <TouchableOpacity
            onPress={() => setOtpSent(false)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Image
              source={require('./../../assets/icons/rounded-arrow.png')}
              style={styles.roundArrow_Image}
            />

            <Text style={styles.footerText}>
              Didn't recieve the otp? Send OTP
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <LoginButton
              title={otpSent ? 'Login' : 'Send OTP'}
              onPress={() => handleLogin()}
              loading={loading}
            />
          </View>
          <Text style={{textAlign: 'center'}}>
            Don't have an account ?
            <Text
              onPress={() => navigation.navigate('Signup')}
              style={styles.bottomText}>
              {' '}
              Signup
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2BBBA0',
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
  loginContainer:{
margin:12
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#2BBBA0',
  },
  footerText:{
    textAlign: 'right', padding: 12
  },
  bottomText:{
  color: '#2BBBA0', fontWeight: 'bold'},
  imageIcon:{
    width: 60, 
    height: 70
  },
 roundArrow_Image:{width: 15, height: 15}
});
