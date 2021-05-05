import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomerProfile from './CustomerProfile';
import CustomerChats from './CustomerChats';
import CustomerUpdatesScreen from './CustomerUpdatesScreen';

const Tab = createBottomTabNavigator();

const CustomerDashboardScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Customer Profile' component={CustomerProfile} />
      <Tab.Screen name='Customer Chat' component={CustomerChats} />
      <Tab.Screen name='Customer Updates' component={CustomerUpdatesScreen} />
    </Tab.Navigator>
  );
};

export default CustomerDashboardScreen;
