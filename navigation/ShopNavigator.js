import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';

const ProductsNavigation = createStackNavigator({
    ProductsOverview: ProductOverviewScreen
},
{
    defaultNavigationOptions:{
        headerStyle: 
        {
            backGroundColor: Colors.primary
        },
        headerTintColor: 'white'
    }
});

export default createAppContainer(ProductsNavigation);



