import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Button
} from 'react-native'

import { connect } from 'react-redux';

import CartItem from '../../componenets/shop/CartItem';
import * as CartActions from '../../store/actions/cart';

import Order from '../../models/Order';
import * as OrderActions from '../../store/actions/orders';

import Colors from '../../constants/Colors';

const CartScreen = (props)=>{

    const makeOrder = ()=>{
        props.addOrder({
            dateStart: Date.now(),
            status: 'In-Progress',
            cartItem: props.cart.items,
            userId: props.userId
        });

        props.clearCart();
        props.navigation.goBack();        
    }

    return(
        <View style={styles.container}>
           { props.cart.items.length !== 0 ?
                <FlatList
                    style={styles.cartListStyle}
                    data={props.cart.items}
                    keyExtractor={(item=>item.id)}
                    renderItem={
                        (itemData)=>{                       
                            return(
                                <CartItem
                                    item={itemData.item}
                                    trashPressed={()=>{props.deleteForCart(itemData.item)}}
                                />
                            )
                        }
                    }
                /> :
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                </View>                
        }
           
            <Text style={styles.totalAmount}>Amount total : ${props.cart.totalAmount}</Text>
            {
                props.cart.totalAmount !== 0 ?
                <Button
                    title="Make order"
                    onPress={makeOrder}
                    color={Colors.primary}/> : null
            }           
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },   
    cartListStyle:{       
        width: '100%'
    },
    empty:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'    
    },
    emptyText:{
        fontStyle: 'roboto-bold',
        fontWeight: 'bold',
        fontSize: 25
    },
    totalAmount:{
        fontFamily: 'roboto',
        fontWeight: 'bold',
        fontSize: 30
    }
})

const mapStateToProps = (state)=>{    
    return{
        'cart': state.cart,
        'orders': state.orders,
        'userId': state.user.localId
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        'clearCart': ()=>{
            dispatch({
                type: CartActions.CLEAR_CART
            })
        },
        'deleteForCart': (item)=>dispatch({
            type: CartActions.DELETE_ITEM,
            payload: item
        }),
        'addOrder': (item)=>dispatch(OrderActions.AddOrder(item))
    }
   
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);