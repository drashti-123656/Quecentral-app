import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import EmailLogin from './../screens/auth/EmailLogin';
import Signup from './../screens/auth/Signup';
import Dashboard from './../screens/Dashboard';
import Login from './../screens/auth/Login';
import {checkLogintype as checkLogintypeAPI} from './../services/auth';
import phonenumber from '../components/atoms/PhoneNumberInput';
const Stack = createStackNavigator();

const AuthNavigation = () => {
  const [Logintype, setLogintype] = React.useState('EmailLogin');
 
  const checkLogintype = async () => {
    const response = await checkLogintypeAPI();
    if (response.data.response.response_code === '200') {
      setLogintype(response.data.data.login_type);
    }
  };
 
  useEffect(() => {
    checkLogintype();
  }, []);
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EmailLogin"
        component={Logintype === 'mobile' ? Login : EmailLogin }
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
