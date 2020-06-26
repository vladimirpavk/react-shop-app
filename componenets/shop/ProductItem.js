import React from 'react';
import {
    View,
    Image,
    Button,
    StyleSheet,
    Text
} from 'react-native';

import Colors from '../../constants/Colors';

const ProductItem = (props)=>{   
    return(
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
                <Text style={{fontWeight: 'bold', marginBottom: 5}}>{props.item.title}</Text>
                <Text style={{fontWeight: '100'}}>${props.item.price}</Text>
                <View style={styles.productItemButtons}>
                    <Button
                        style={styles.productItemButton}
                        title="View Details"
                        onPress={props.viewDetailsClicked}
                    />
                    <Button
                        style={styles.productItemButton}
                        title="To Cart"
                        onPress={props.toCartClicked}
                    />
                </View>
            </View>
        </View>
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
    productItemButton:{
        backgroundColor: Colors.primary
    }
})

export default ProductItem;