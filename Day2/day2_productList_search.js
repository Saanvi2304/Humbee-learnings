import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';

const App = () => {
  const [products, setProduct] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [fulldata, setfullData] = useState('');

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products');

      const json = await res.json();

      setProduct(json.products);
      setfullData(json.products);
    } catch (err) {
      console.error('error has occured', err);
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

  const handleSearch = query => {
    setSearch(query);
    const formattedQuery = query.toLowerCase();
    const filterData = fulldata.filter(item => {
      return contains(item.title, formattedQuery); //return item.title.toLowerCase().includes(formattedQuery)
    });
    setProduct(filterData);
  };

  const contains = (name, query) => {
    const first = name.toLowerCase();
    if (first.includes(query)) {
      return true;
    }
    return false;
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
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
          renderItem={({item}) => (
            <View style={styles.container}>
              <View style={styles.individual}>
                <Image source={{uri: item.images[0]}} style={styles.img} />
                <Text style={styles.txt}>{item.title}</Text>
                <Text style={styles.txtL2}> Desc:</Text>
                <Text style={[styles.txtR2, {backgroundColor: 'none'}]}>
                  {item.description}
                </Text>
                <Text style={styles.txtL2}> Rating:</Text>
                <Text style={styles.txtL3}>{item.rating}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

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
  },
  individual: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 30,
    width: '90%',
    height: 260
  },
  txt: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 9,
  },
  txtL2: {
    fontWeight: 'normal',
    textAlign: 'left',
    marginLeft: -120,

    marginTop: 4,
    flexShrink: 1,
    fontWeight: 'bold',
    fontSize: 6.5,
  },
  txtL3: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 7,
    marginTop: -9.5,
  },
  txtR2: {
    fontWeight: 'normal',
    textAlign: 'right',
    flexShrink: 1,
    marginTop: -10,
    marginLeft: 25,
    width: 100,
    fontSize: 6.5,
  },
  search: {
    color: 'black',
    borderWidth: 0.2,
    borderRadius: 20,
    elevation: 0,
    margin: 6,
  },
});

export default App;
