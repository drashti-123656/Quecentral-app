import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {login as signIn, reset} from './../../redux/actions/auth';
import LoginButton from './../../components/button/LoginButton';
import {showMessage} from 'react-native-flash-message';
import {COLORS} from './../../utils/theme';
import {Formik} from 'formik';
import {SigninSchema} from './../../utils/schema';
import InputPassword from './../../components/molecules/InputPassword';

const EmailLogin = ({navigation}) => {
  const dispatch = useDispatch();
  const {error, errorMsg} = useSelector(({auth}) => auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country_code, setCountry_code] = useState(91);
  const [loading, setLoading] = useState(false);

  const handleLogin = async data => {
    setLoading(true);

    let formData = new URLSearchParams({
      email: data.email,
      password: data.password,
      login_type: 1
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

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={SigninSchema}
            onSubmit={values => handleLogin(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              values,
            }) => (
              <View>
                <TextInput
                  style={styles.input}
                  value={values.email}
                  placeholder={'Enter email'}
                  onChangeText={handleChange('email')}
                  placeholderTextColor="#a1a1a1"
                />
                {errors.email && touched.email ? (
                  <Text style={styles.error}>{errors.email}</Text>
                ) : null}

                <InputPassword
                  value={values.password}
                  placeholder={'Enter password'}
                  onChangeText={handleChange('password')}
                  placeholderTextColor="#a1a1a1"
                />

                {errors.password && touched.password ? (
                  <Text style={styles.error}>{errors.password}</Text>
                ) : null}

                <TouchableOpacity
                  onPress={() => console.log('sdsd')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  {/* <Image
                    source={require('./../../assets/icons/rounded-arrow.png')}
                    style={{width: 15, height: 15}}
                  /> */}

                  <Text
                    style={{
                      textAlign: 'right',
                      padding: 12,
                      fontWeight: 'bold',
                    }}>
                    Forgot password ?
                  </Text>
                </TouchableOpacity>

                <View style={{margin: 12}}>
                  <LoginButton
                    title={'Login'}
                    onPress={handleSubmit}
                    loading={loading}
                  />
                </View>
              </View>
            )}
          </Formik>

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
    color: '#000',
  },
  error: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.warningRed,
    marginHorizontal: 12,
    textAlign: 'right',
  },
});
