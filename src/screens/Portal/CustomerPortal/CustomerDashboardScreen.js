import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CustomerProfile from './CustomerProfile';
import CustomerChats from './CustomerChats';

const Tab = createBottomTabNavigator();

const CustomerDashboardScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-circle-outline';
          } else if (route.name === 'Updates') {
            iconName = focused
              ? 'chatbubble-ellipses'
              : 'chatbubble-ellipses-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name='Profile' component={CustomerProfile} />
      <Tab.Screen name='Updates' component={CustomerChats} />
    </Tab.Navigator>
  );
};

export default CustomerDashboardScreen;
