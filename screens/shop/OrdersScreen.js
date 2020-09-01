import React, { useEffect } from 'react';

import { 
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../UI/HeaderButton';

import { connect } from 'react-redux';
import * as OrdersActions from '../../store/actions/orders';

import OrderItem from '../../componenets/shop/OrderItem';

const OrdersScreen = (props)=>{

    useEffect(
        ()=>{
            props.fetchOrders(props.userId);
        }, []        
    );

    return(
        <View style={styles.container}>    
            <FlatList
            style={styles.flatListStyle}
                data={props.orders}
                keyExtractor={item=>item.id}
                renderItem={
                    itemData=>{
                        return(
                            <OrderItem
                                item={itemData.item}
                                userId={props.userId}
                            />
                    )}
                }                
            />        
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
        alignItems: 'center',
        width: '100%',
    },
    flatListStyle:{
        width: '100%'
    }
})

const mapStateToProps = (state)=>
{
    return{
        'orders' : state.orders.orders,
        'userId' : state.user.localId
    }    
}

const mapDispatchToProps = (dispatch)=>{
    return {
        'fetchOrders' : (userId)=>dispatch(OrdersActions.FetchOrders(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);