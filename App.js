import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './src/screens/MenuScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Menu' component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
