import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

import {  } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const ProductsNavigation = createStackNavigator({
    'ProductsOverview': ProductOverviewScreen,
    'ProductDetail': ProductDetailScreen,
    'Cart': CartScreen
},
{
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
        drawerIcon: drawerConfig => <Ionicons></Ionicons>
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

const AppNavigation = createDrawerNavigator({
    'Products': ProductsNavigation,
    'Orders': OrdersNavigation
})

export default createAppContainer(AppNavigation);



