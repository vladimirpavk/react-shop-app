import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const CartItem = (props)=>{
    const itemPrice=props.item.qty*props.item.price;
    return(
        <View style={styles.cartItem}>
            <Text style={styles.cartItemText}>{props.item.title} ${props.item.price} x {props.item.qty} -<Text style={styles.cartItemText1}> ${itemPrice.toFixed(2)}</Text></Text>
            <TouchableOpacity
                onPress={props.trashPressed}
                style={styles.trashButton}>            
                    <Ionicons name='md-trash' size={25} color='red'/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
         fontSize: 20
     },
     cartItemText1:{
         fontFamily: 'roboto-bold',
         fontWeight: 'bold'        
     },  
    trashButton:{
        width:'20%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CartItem;