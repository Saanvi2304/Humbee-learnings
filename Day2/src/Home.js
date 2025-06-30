import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';

export default function Home({navigation}) {
  const [products, setProducts] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products');
      const json = await res.json();
      setProducts(json.products);
    } catch (err) {
      console.error('error has occurred', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Product', {products})}
          style={{width: 100, height: 100}}>
          <Text> GOTO Products</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {
              name: 'Home',
              productCount: products.length,
            })
          }
          style={{width: 100, height: 100}}>
          <Text> GOTO Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
