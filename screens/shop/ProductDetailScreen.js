import React, {useEffect} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    Button
} from 'react-native';

import Colors from '../../constants/Colors';

const ProductsDetailScreen = (props)=>{    
    const product = props.navigation.getParam('itemProps');
    const toCart = props.navigation.getParam('toCart');
    useEffect(
        ()=>{
            props.navigation.setParams({
                productTitle: product.title
            });
        }, [props.navigation]
    );
  

    return(
        <View style={styles.container}>
            <View style={styles.picContainer}>
                <Image
                    style={{flex:1}}
                    source={{
                        uri:product.imageUrl
                    }}
                />
            </View>
            <View style={styles.detailsContainer}>
                <Button
                    color={Colors.primary}
                    title="Add To Cart"
                    onPress={()=>toCart(product)}
                />
                <Text style={{fontWeight: '100'}}>
                    ${product.price.toFixed(2)}
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                    {product.description}
                </Text>
            </View>
        </View>
    )
}

ProductsDetailScreen.navigationOptions = (navData)=>{
    return{
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    picContainer:{       
        flex:1,
        width: '100%'
    },
    detailsContainer:{       
        flex:1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
});

export default ProductsDetailScreen;