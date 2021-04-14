import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../../screens/HomeScreen';
import ShopScreen from '../../screens/ShopScreen';
import ContactUs from '../../screens/ContactUsScreen';
import LoginScreen from '../../screens/CustomerPortal/LoginScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        width: 230,
      }}
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons name='home' size={focused ? 25 : 20} color='black' />
          ),
        }}
      />
      <Drawer.Screen
        name='Shop'
        component={ShopScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name='shopping-cart'
              size={focused ? 25 : 20}
              color='black'
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Contact Us'
        component={ContactUs}
        options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name='phone'
              size={focused ? 25 : 20}
              color='black'
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Customer Portal'
        component={LoginScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name='person'
              size={focused ? 25 : 20}
              color='black'
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
