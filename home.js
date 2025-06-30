import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from './redux/productReducer';
import React, {useEffect, useState} from 'react';

import {addToCart, updateQuantity} from './redux/cartReducer';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';

export default function Home({navigation}) {
  const dispatch = useDispatch();
  const {products, loading} = useSelector(state => state.products);
  const [search, setSearch] = useState('');
  const [fulldata, setfullData] = useState([]);
  const[count, setCount]=useState(0);
  useEffect(() => {
    dispatch(fetchProducts()).then(() => {
      setfullData(products);
    });
  }, []);
  const {items} = useSelector(state => state.cart);

  if (loading) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="pink" />
      </SafeAreaView>
    );
  }

  const handleSearch = query => {
    setSearch(query);
    const formattedQuery = query.toLowerCase();
    const filterData = fulldata.filter(item => {
      return item.title.toLowerCase().includes(formattedQuery);
    });
    setProduct(filterData);
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartBtn}>
          <Text style={styles.btnText}>cart</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View>
          <TextInput
            placeholder="Search"
            placeholderTextColor="black"
            autoCapitalize="none"
            autoCorrect={false}
            value={search}
            onChangeText={query => {
              handleSearch(query);
            }}
            style={styles.search}
          />
        </View>
        <FlatList
          data={products}
          numColumns={2}
 renderItem={({item}) => {
  const cartItem = items.find(cartItem => cartItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <View style={styles.container}>
      <View style={styles.individual}>
        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={() => dispatch(addToCart(item))}>
            <Text style={{color: 'white'}}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity 
              style={styles.BtnM}
              onPress={() => dispatch(updateQuantity(item.id, -1))}>
              <Text style={{color: 'white'}}>-</Text>
            </TouchableOpacity>
            
            <View style={styles.plusmin}>
              <Text>{quantity}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.BtnP}
              onPress={() => dispatch(updateQuantity(item.id, 1))}>
              <Text style={{color: 'white'}}>+</Text>
            </TouchableOpacity>
          </View>
        )}

        <Image source={{uri: item.images[0]}} style={styles.img} />
        <Text style={styles.txt}>{item.title}</Text>
        <Text style={styles.txtL2}> Price:</Text>
        <Text style={styles.txtL3}>${item.price}</Text>
      </View>
    </View>
  )
}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 130,
    width: 130,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 2,
  },
  individual: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 30,
    width: '90%',
    height: 260,
  },
  txt: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 9,
    marginTop: 10,
    width: 130,
  },
  txtL2: {
    fontWeight: 'normal',
    textAlign: 'left',
    marginLeft: -110,
    marginTop: 13,
    flexShrink: 1,
    fontWeight: 'bold',
    fontSize: 10,
  },
  txtL3: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 15,
    marginTop: -18,
  },
  search: {
    color: 'black',
    borderWidth: 0.2,
    borderRadius: 20,
    elevation: 0,
    margin: 6,
  },
  cartBtn: {
    height: 40,
    width: 90,
    backgroundColor: 'pink',
    borderRadius: 30,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    width: 70,
    height: 20,
    backgroundColor: 'white',
    marginTop: '160%',
    marginLeft: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 20,
  },
  btnText: {
    color: 'white',
    fontStyle: 'courier',
    fontSize: 20,
  },
  addToCartBtn: {
    position: 'absolute',
    zIndex: 3,
    marginTop: 14,
    marginBottom: -220,
    backgroundColor: 'pink',
    height: 30,
    width: 165,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  BtnP:{
    position: 'absolute',
    zIndex: 5,
    marginTop: 415,
    marginBottom: -25,
    backgroundColor: 'pink',
    height: 30,
    width: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft:-80,


  },
    BtnM:{
    position: 'absolute',
    zIndex: 5,
    marginTop: 415,
    marginBottom: -25,
    backgroundColor: 'pink',
    height: 30,
    width: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 40

  },
  plusmin:{
    position: 'absolute',
    zIndex: 3,
    marginTop: 440,
    backgroundColor: 'pink',
    height: 30,
    width: 140,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: -70
    
  }
});
