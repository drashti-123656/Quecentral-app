import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from './../utils/theme';
import Categories from './../screens/Categories';
import ServicesList from './../screens/ServicesList';
import EStyleSheet from 'react-native-extended-stylesheet';

const categoriesStack = createNativeStackNavigator();

const CategoriesStack = () => {
  return (
    <categoriesStack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerStyle: {backgroundColor: EStyleSheet.value('$PRIMARY')},
        headerTintColor: '#fff',
      }}>
      <categoriesStack.Screen
        name="Categories"
        options={{
          headerShown: false,
          title: 'Categories',
          headerBackVisible: true,
        }}
        component={Categories}
      />
      <categoriesStack.Screen
        name="ServicesList"
        options={{
          headerShown: true,
          title: 'Service list',
          headerBackVisible: true,
        }}
        component={ServicesList}
      />
    </categoriesStack.Navigator>
  );
};

export default CategoriesStack;

const styles = StyleSheet.create({});
