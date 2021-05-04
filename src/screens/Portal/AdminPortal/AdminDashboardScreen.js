import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AdminProfile from './AdminProfile';
import AdminChats from './AdminChats';

const Tab = createBottomTabNavigator();

const AdminDashboardScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Admin Profile' component={AdminProfile} />
      <Tab.Screen name='Admin Chat' component={AdminChats} />
    </Tab.Navigator>
  );
};

export default AdminDashboardScreen;
