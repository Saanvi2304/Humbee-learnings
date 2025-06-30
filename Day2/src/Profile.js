import React from 'react';
import {SafeAreaView, View, TouchableOpacity, Text} from 'react-native';

export default function Profile({navigation, route}) {
  const {name, productCount} = route.params;
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View>
        <Text> WE HAVE COME FROM {name} SCREEN</Text>
        <Text> TOTAL PRODUCTS: {productCount}</Text>
      </View>
      <View>
        <Text> </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{width: 100, height: 100}}>
          <Text> GOTO home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
