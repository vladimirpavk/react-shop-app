import React from 'react';
import {
    View,
    FlatList,
    StyleSheet
 } from 'react-native';

import { connect } from 'react-redux';

import Colors from '../../constants/Colors';
import ProductItem from '../../componenets/shop/ProductItem';

const ProductsOverviewScreen = (props)=>{
    
    const productToCartClicked = (item)=>{
        console.log('Product to cart clicked...');
        console.log(item);
    }

    const productDetailClicked = (item)=>{
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                itemProps: item,
                toCart: productToCartClicked
            }
        });
    }

    return(
        <View style={styles.container}>      
            <FlatList                
                data={props.products}
                keyExtractor={(item)=>item.id}
                renderItem={
                    (itemData)=>{
                        return(
                            <ProductItem
                                item={itemData.item}
                                viewDetailsClicked={()=>productDetailClicked(itemData.item)}
                                toCartClicked={()=>productToCartClicked()}>
                            </ProductItem>
                            );
                    }
                }
            />
        </View>
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10
    }    
  });

const mapStateToProps = (state)=>{
    return{
        products: state.products.availableProducts
    }
}

export default connect(mapStateToProps)(ProductsOverviewScreen);