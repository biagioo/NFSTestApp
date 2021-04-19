import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import DashboardScreen from './DashboardScreen';
import LoadingScreen from './LoadingScreen';
import CustomerDashboardScreen from './CustomerPortal/CustomerDashboardScreen';
import AdminDashboardScreen from './AdminPortal/AdminDashboardScreen';
import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import store from '../../store';

const Stack = createStackNavigator();

const PortalNavigator = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default PortalNavigator;
