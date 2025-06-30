import { Provider } from 'react-redux';
import store from './redux/store';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, View , Text, Image, FlatList, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './home';
import Cart from './cart';

const Stack = createNativeStackNavigator();



export default function App(){
 
  
  return(
    <Provider store = {store}>
      <NavigationContainer >
       <Stack.Navigator initialRouteName="Home">

          <Stack.Screen name = "Home" component = {Home}/>
          <Stack.Screen name = "Cart" component = {Cart}/>
        </Stack.Navigator>
        
        </NavigationContainer> 
        </Provider>
  )
}

