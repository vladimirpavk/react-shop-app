import React from 'react';

import {
    View,
    StyleSheet
} from 'react-native';

const OrderItem = (props)=>{
    return(
        <View style={styles.container}>
            <Text>Order Id: {props.item.id}</Text>
            <Text>Date: {props.item.date}</Text>
            <Text>Status: {props.item.orderStatus}</Text>
        </View>
    )            
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: 'red'
    }
});

export default OrderItem;