import React from 'react';

import {
    View,
    StyleSheet,
    Text
} from 'react-native';

const OrderItem = (props)=>{
    return(
        <View style={styles.container}>
            <View style={styles.labelStyle}>
                <Text style={styles.labelText}>Order Id: </Text><Text>{props.item.id}</Text>           
            </View>
            <View style={styles.labelStyle}>
                <Text style={styles.labelText}>Date: </Text><Text>{(new Date(props.item.dateStart)).toLocaleDateString()}</Text>           
            </View>
            <View style={styles.labelStyle}>
                <Text style={styles.labelText}>Status: </Text><Text>{props.item.status}</Text>           
            </View>
        </View>
    )            
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: "100%",
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderWidth: 2,
        borderColor: 'black'
    },
    labelText: {
        fontWeight: 'bold'
    },
    labelStyle:{
        flexDirection: 'row',
        alignItems: 'flex-end'
    }
});

export default OrderItem;