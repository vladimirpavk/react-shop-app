import React from 'react';
import {
    View,
    FlatList,
    StyleSheet
 } from 'react-native';

import { connect } from 'react-redux';

import Colors from '../../constants/Colors';
import ProductItem from '../../componenets/shop/ProductItem';

import * as CartActions from '../../store/actions/cart';

const ProductsOverviewScreen = (props)=>{
    
    const productToCartClicked = (item)=>{
       /*  console.log('Product to cart clicked...');
        console.log(item); */    
        props.addToCart(item);
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
                                toCartClicked={()=>productToCartClicked(itemData.item)}>
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

const mapDispatchToProps = (dispatch)=>{
    return{
        'addToCart': (item)=>dispatch({
            type: CartActions.ADD_ITEM,
            payload: item
        })
    }
   
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsOverviewScreen);