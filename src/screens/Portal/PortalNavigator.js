import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { LogBox } from 'react-native';
import firebase from 'firebase';

import rootReducer from '../../reducers/index';
import CustomerDashboardScreen from './CustomerPortal/CustomerDashboardScreen';
import AdminDashboardScreen from './AdminPortal/AdminDashboardScreen';
import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import MainScreen from './MainScreen';
import AdminChatScreen from './AdminPortal/AdminChatScreen';
import CustomerChatScreen from './CustomerPortal/CustomerChatScreen';
import ForgotPassword from './auth/ForgotPassword';

LogBox.ignoreLogs(['Setting a timer']);

const firebaseConfig = {
  apiKey: 'AIzaSyD_hY7ln70-ScZMitRzW22kZWLaBFwhm0s',
  authDomain: 'nfs-test-app.firebaseapp.com',
  projectId: 'nfs-test-app',
  storageBucket: 'nfs-test-app.appspot.com',
  messagingSenderId: '1050548907903',
  appId: '1:1050548907903:web:ba3252e9df066008d0344a',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();

const PortalNavigator = ({ navigation }) => {
  return (
    <Provider store={store}>
      <Stack.Navigator initialRouteName='Log In' headerMode='none'>
        <Stack.Screen name='Log In' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        <Stack.Screen
          name='CustomerDashboard'
          component={CustomerDashboardScreen}
        />
        <Stack.Screen name='AdminDashboard' component={AdminDashboardScreen} />
        <Stack.Screen name='MainScreen' component={MainScreen} />
        <Stack.Screen
          name='CustomerChatScreen'
          component={CustomerChatScreen}
        />
        <Stack.Screen name='AdminChatScreen' component={AdminChatScreen} />
      </Stack.Navigator>
    </Provider>
  );
};

export default PortalNavigator;
