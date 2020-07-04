import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native'

import { connect } from 'react-redux';

import CartItem from '../../componenets/shop/CartItem';
import * as CartActions from '../../store/actions/cart';

const CartScreen = (props)=>{

    return(
        <View style={styles.container}>
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
            />
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
        flex:1,
        width: '100%',
        borderColor: 'red',
        borderWidth: 2
    }
})

const mapStateToProps = (state)=>{    
    return{
        'cart': state.cart
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        'deleteForCart': (item)=>dispatch({
            type: CartActions.DELETE_ITEM,
            payload: item
        })
    }
   
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);