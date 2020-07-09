import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import Colors from '../../constants/Colors';

const ProductItem = (props)=>{   
    const [button1Text, setButton1Text] = useState('');
    const [button2Text, setButton2Text] = useState('');

    useEffect(
        ()=>{
            //console.log('effects...', props);
            if(props.viewDetailsClicked){
                setButton1Text('View Details');
                setButton2Text('To Cart');
            }
            if(props.editClicked){
                setButton1Text('Edit');
                setButton2Text('Delete');
            }
        }, [props.viewDetailsClicked, props.editClicked]
    );

    return(
        <TouchableOpacity
            onPress={props.viewDetailsClicked}>
            <View style={styles.productItemContainer}>
                <View style={styles.productItemPic}>
                    <Image
                        style={{flex:1}}
                        source={{
                            uri:props.item.imageUrl
                        }}
                    />
                </View>
                <View style={styles.productItemDetails}>
                    <Text style={styles.titleStyle}>{props.item.title}</Text>
                    <Text style={styles.priceStyle}>${props.item.price}</Text>
                    <View style={styles.productItemButtons}>
                        <Button
                            color={Colors.primary}
                            title={button1Text}
                            onPress={props.viewDetailsClicked || props.editClicked}
                        />
                        <Button
                            color={Colors.primary}
                            title={button2Text}
                            onPress={props.toCartClicked || props.deleteClicked}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    productItemContainer: {
        height: 300,
        marginBottom: 20,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2
    },
    productItemPic:{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        height: '70%'
    },
    productItemDetails:{
        height: '30%',
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    productItemButtons:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    titleStyle:{
        fontFamily: 'roboto-bold',
        fontWeight: 'bold'        ,
        fontSize: 25,
        marginBottom: 5
    },
    priceStyle:{
        fontFamily: 'roboto',
        fontWeight: '100',
        fontSize: 15
    }
})

export default ProductItem;