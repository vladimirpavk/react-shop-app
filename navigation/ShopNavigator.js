import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

import Colors from '../constants/Colors';

const ProductsNavigation = createStackNavigator({
    'ProductsOverview': ProductOverviewScreen,
    'ProductDetail': ProductDetailScreen
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

export default createAppContainer(ProductsNavigation);



