import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';

import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

const store=createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const loadFonts = ()=>{
  return Font.loadAsync({
    'roboto':require('./assets/fonts/RobotoCondensed-Regular.ttf'),
    'roboto-bold':require('./assets/fonts/RobotoCondensed-Bold.ttf')
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded]=useState(false);

  if(!fontLoaded){
    <AppLoading
      startAsync={loadFonts}
      onFinish={()=>setFontLoaded(true)}
    />
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <ShopNavigator />
      </View>
      </Provider>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',  
    borderColor: 'black',
    borderWidth: 2
  },
});