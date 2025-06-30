import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/Home';
import Profile from './src/Profile';
import Product from './src/Product';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Product" component={Product} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
