import React from 'react';

import {
    View,
    StyleSheet,
    Text,
    Button
} from 'react-native';

import * as OrderActions from '../../store/actions/orders';
import { connect } from 'react-redux';

const OrderItem = (props)=>{

    const orderConfirmed = ()=>{
        console.log('Order confirmed...');
        //props.item
        props.updateOrder(props.item);
    }

    return(
        <View style={styles.container}>
            <View style={styles.containerLeft}>
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
            <View style={styles.containerRight}>
                <Button
                    title="Confirm Order"
                    onPress={()=>orderConfirmed()}
                />
            </View>
        </View>
    )            
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: "100%",        
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 2,
        borderColor: 'black'
    },
    containerLeft: {
        flex: 2
    },
    containerRight:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelText: {
        fontWeight: 'bold'
    },
    labelStyle:{
        flexDirection: 'row',
        alignItems: 'flex-end'
    }
});

const mapDispatchToProps = (dispatch)=>{
    return{
        'updateOrder': (order)=>dispatch(OrderActions.UpdateOrders(order))
    }
}

export default connect(null, mapDispatchToProps)(OrderItem);