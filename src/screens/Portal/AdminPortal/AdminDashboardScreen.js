import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AdminProfile from './AdminProfile';
import AdminUpdates from './AdminUpdates';

const Tab = createBottomTabNavigator();

const AdminDashboardScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Admin Profile' component={AdminProfile} />
      <Tab.Screen name='Admin Updates' component={AdminUpdates} />
    </Tab.Navigator>
  );
};

export default AdminDashboardScreen;
