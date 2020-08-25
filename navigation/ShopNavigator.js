import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductsScreen from '../screens/user/EditProductScreen';

import AuthScreen from '../screens/user/AuthScreen';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const ProductsNavigation = createStackNavigator({
    'ProductsOverview': ProductOverviewScreen,
    'ProductDetail': ProductDetailScreen,
    'Cart': CartScreen
},
{
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons name="md-gift" size={24} color="black"></Ionicons>
    },
    defaultNavigationOptions:{
        headerStyle: 
        {
            backgroundColor: Colors.primary
        },
        headerTintColor: 'white',
        headerTitleStyle:{
            fontFamily: 'roboto-bold',
            fontWeight: 'bold',
            fontSize: 25
        }
    }
});

const OrdersNavigation = createStackNavigator({
    'Orders': OrdersScreen
},
{
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons name="md-list" size={24} color="black" />
    },
    defaultNavigationOptions:{
        headerStyle: 
        {
            backgroundColor: Colors.primary
        },
        headerTintColor: 'white',
        headerTitleStyle:{
            fontFamily: 'roboto-bold',
            fontWeight: 'bold',
            fontSize: 25
        }
    }
});

const UserNavigation = createStackNavigator({
    'UserProducts': UserProductsScreen,    
    'EditProduct': EditProductsScreen
},
{
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons name="md-settings" size={24} color="black" />
    },
    defaultNavigationOptions:{
        headerStyle: 
        {
            backgroundColor: Colors.primary
        },
        headerTintColor: 'white',
        headerTitleStyle:{
            fontFamily: 'roboto-bold',
            fontWeight: 'bold',
            fontSize: 25
        }
    }
});

const UserNavigation = createStackNavigator({
    'UserAuth': UserAuth
},{
    defaultNavigationOptions:{
        headerStyle: 
        {
            backgroundColor: Colors.primary
        },
        headerTintColor: 'white',
        headerTitleStyle:{
            fontFamily: 'roboto-bold',
            fontWeight: 'bold',
            fontSize: 25
        }
    }
});

const AppNavigation = createDrawerNavigator({
    'Products': ProductsNavigation,
    'Orders': OrdersNavigation,
    'Admin': UserNavigation
})

export default createAppContainer(AppNavigation);



