import React from 'react';

import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../UI/HeaderButton';


const OrdersScreen = (props)=>{
    return(
        <View style={styles.container}>
            <Text>This is orders screen</Text>
        </View>
    )    
}

OrdersScreen.navigationOptions = (navData)=>{
    return {        
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Drawer'
                iconName='md-menu'
                onPress={
                    ()=>{
                        navData.navigation.toggleDrawer();
                    }
                }/>
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrdersScreen;