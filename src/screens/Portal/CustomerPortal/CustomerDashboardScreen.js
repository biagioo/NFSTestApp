import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomerProfile from './CustomerProfile';
import CustomerUpdates from './CustomerUpdates';

const Tab = createBottomTabNavigator();

const CustomerDashboardScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Customer Profile' component={CustomerProfile} />
      <Tab.Screen name='Customer Updates' component={CustomerUpdates} />
    </Tab.Navigator>
  );
};

export default CustomerDashboardScreen;
