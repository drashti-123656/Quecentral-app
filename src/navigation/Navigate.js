import React,{useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import DashboardNavigation from './DashboardNavigation';
import {navigationRef} from './RootNavigation';

const Stack = createStackNavigator();

const Navigate = () => {
  const {
    authData: {isLoggedIn},
  } = useSelector(({auth}) => auth);

  const {
   theme,
  } = useSelector(({app}) => app);

  const [shouldRender, setShouldRender] = useState(false)
  useEffect(() => {
    !shouldRender ? setShouldRender(true) : null;
  }, [theme]);

  return (
    
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen
            name="AuthNavigation"
            options={{headerShown: false}}
            component={AuthNavigation}
          />
        ) : (
          <Stack.Screen
            name="DashboardNavigation"
            options={{headerShown: false}}
            component={DashboardNavigation}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigate;

const styles = StyleSheet.create({});
