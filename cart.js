import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';

export default function Cart({navigation}) {
  const {items} = useSelector(state => state.cart);

  return (
    <SafeAreaView style={styles.safeArea}>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          contentContainerStyle={styles.listContainer}

renderItem={({item}) => (
  <View style={styles.itemContainer}>
    <Image source={{uri: item.images[0]}} style={styles.img} />
    <View style={{flex: 1}}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>Quantity: {item.quantity}</Text>
    </View>
    <Text style={styles.itemPrice}>${item.price * item.quantity}</Text>
  </View>
)}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    backgroundColor: 'pink',
    padding: 15,
    borderRadius: 30,
    margin: 20,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
  listContainer: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 15,
    width: 170,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  img: {
    height: 45,
    width: 45,
    marginRight: 10,
    borderRadius: 10,
  },
});
