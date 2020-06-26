import React from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const ProductsDetailScreen = (props)=>{
    console.log(props.navigation.getParam('param1'));

    return(
        <View style={styles.container}>
            <Text>This is the product details screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductsDetailScreen;