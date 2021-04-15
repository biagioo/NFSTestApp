import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import DashboardScreen from './DashboardScreen';
import LoadingScreen from './LoadingScreen';

const Stack = createStackNavigator();

const CustomerPortal = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Log In' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='Dashboard' component={DashboardScreen} />
      <Stack.Screen name='Loading' component={LoadingScreen} />
    </Stack.Navigator>
  );
};

export default CustomerPortal;
