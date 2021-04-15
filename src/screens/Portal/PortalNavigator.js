import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './DashboardScreen';
import LoadingScreen from './LoadingScreen';
import CustomerDashboardScreen from './CustomerPortal/CustomerDashboardScreen';
import AdminDashboardScreen from './AdminPortal/AdminDashboardScreen';
import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';

const Stack = createStackNavigator();

const PortalNavigator = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Log In' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='Dashboard' component={DashboardScreen} />
      <Stack.Screen name='Loading' component={LoadingScreen} />
      <Stack.Screen
        name='CustomerDashboard'
        component={CustomerDashboardScreen}
      />
      <Stack.Screen name='AdminDashboard' component={AdminDashboardScreen} />
    </Stack.Navigator>
  );
};

export default PortalNavigator;
