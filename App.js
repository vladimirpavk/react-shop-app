
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ReduxThunk from 'redux-thunk';

import ShopNavigator from './navigation/ShopNavigator';

import * as firebase from 'firebase/app';
import { firebaseObject } from './Settings';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(ReduxThunk)
  )
);

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