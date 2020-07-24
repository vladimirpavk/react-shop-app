import React, { useEffect } from 'react';

import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../UI/HeaderButton';

import { connect } from 'react-redux';
import * as OrdersActions from '../../store/actions/orders';

const OrdersScreen = (props)=>{

    useEffect(
        ()=>{
            props.fetchOrders;
        }, []        
    )
    return(
        <View style={styles.container}>
            <Text>This is orders screen</Text>
        </View>
    )    
}

OrdersScreen.navigationOptions = (navData)=>{
    return {        
        headerLeft: ()=>{
            return(
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='Drawer'
                        iconName='md-menu'
                        onPress={
                            ()=>{
                                navData.navigation.toggleDrawer();
                            }
                        }/>
                </HeaderButtons>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = (state)=>
{
    return{
        'orders' : state.orders
    }    
}

const mapDispatchToProps = (dispatch)=>{
    return {
        'fetchOrders' : dispatch(OrdersActions.FetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);