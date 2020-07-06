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

import Colors from '../../constants/Colors';

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
            <Text style={styles.totalAmount}>Amount total : ${props.cart.totalAmount}</Text>
            {
                props.cart.totalAmount !== 0 ?
                <Button
                    title="Make order"
                    onPress={()=>{}}
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
    totalAmount:{
        fontFamily: 'roboto',
        fontWeight: 'bold',
        fontSize: 30
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