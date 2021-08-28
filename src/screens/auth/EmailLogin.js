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

const EmailLogin = ({navigation}) => {
  const dispatch = useDispatch();
  const {error, errorMsg} = useSelector(state => state.miscData);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country_code, setCountry_code] = useState(91);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    let formData = new URLSearchParams({
        email,
        password
    });

    dispatch(signIn(formData));

 
  };

  useEffect(() => {
    if (error) {
      showMessage({
        message: errorMsg,
        type: 'info',
        backgroundColor: COLORS.warningRed,
      });
      dispatch(reset());
      setLoading(false);
    }
  }, [error, errorMsg]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
              marginTop: 50,
              marginBottom: 20,
            }}>
            Login
          </Text>

          <TextInput
            style={styles.input}
            value={email}
            placeholder={'Enter email'}
            onChangeText={setEmail}
          />

        
            <TextInput
              style={styles.input}
              value={password}
              placeholder={'Enter password'}
              onChangeText={setPassword}
            />
         

          <TouchableOpacity
            onPress={() => console.log('sdsd')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Image
              source={require('./../../assets/icons/rounded-arrow.png')}
              style={{width: 15, height: 15}}
            />

            <Text style={{textAlign: 'right', padding: 12}}>
              Forgot password ? 
            </Text>
          </TouchableOpacity>

          <View style={{margin: 12}}>
            <LoginButton
              title={'Login'}
              onPress={() => handleLogin()}
              loading={loading}
            />
          </View>
          <Text style={{textAlign: 'center'}}>
            Don't have an account ?
            <Text
              onPress={() => navigation.navigate('Signup')}
              style={{color: '#2BBBA0', fontWeight: 'bold'}}>
              {' '}
              Signup
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default EmailLogin;

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
});
