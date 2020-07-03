import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native'

import { connect } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

const CartItem = (props)=>{
    const itemPrice=props.item.qty*props.item.price;
    return(
        <View style={styles.cartItem}>
            <Text style={styles.cartItemText}>{props.item.title} ${props.item.price} x {props.item.qty} -<Text style={styles.cartItemText1}> ${itemPrice}</Text></Text>
            <Ionicons name='md-trash' size={25} color='red'/>
        </View>
    );
}

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
                            <CartItem item={itemData.item} />
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
    cartItem:{
       width: '100%',
       flexDirection: 'row',
       justifyContent: 'flex-start',
       alignItems: 'center',
       marginBottom: 10,
       padding: 10
    },
    cartItemText:{
        width:'80%',
        fontFamily: 'roboto',
        fontSize: 20,
        borderColor: 'red',
        borderWidth: 2
    },
    cartItemText1:{
        fontFamily: 'roboto-bold',
        fontWeight: 'bold'        
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

export default connect(mapStateToProps)(CartScreen);