import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
// import MenuScreen from './src/screens/MenuScreen';
import CustomerPortal from './src/screens/CPScreen';
import ContactUs from './src/screens/ContactUsScreen';
import Shop from './src/screens/ShopScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{
          width: 200,
        }}
        screenOptions={{
          headerShown: false,
          swipeEnabled: true,
        }}
      >
        <Drawer.Screen
          name='Home'
          options={{
            drawerIcon: ({ focused }) => (
              <MaterialIcons
                name='home'
                size={focused ? 25 : 20}
                color='black'
              />
            ),
          }}
          component={HomeScreen}
        />
        <Drawer.Screen
          name='Contact Us'
          options={{
            drawerIcon: ({ focused }) => (
              <MaterialIcons
                name='phone'
                size={focused ? 25 : 20}
                color='black'
              />
            ),
          }}
          component={ContactUs}
        />
        <Drawer.Screen name='Customer Portal' component={CustomerPortal} />
        <Drawer.Screen
          name='Shop'
          component={Shop}
          screenOptions={{
            headerShown: true,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
