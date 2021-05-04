import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomerProfile from './CustomerProfile';
import CustomerChatd from './CustomerChats';

const Tab = createBottomTabNavigator();

const CustomerDashboardScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Customer Profile' component={CustomerProfile} />
      <Tab.Screen name='Customer Chat' component={CustomerChatd} />
    </Tab.Navigator>
  );
};

export default CustomerDashboardScreen;
