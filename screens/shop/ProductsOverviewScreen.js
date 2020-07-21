import React, { useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet
 } from 'react-native';
 
 import { HeaderButtons, Item } from 'react-navigation-header-buttons';
 import HeaderButton from '../../UI/HeaderButton';

import { connect } from 'react-redux';

import Colors from '../../constants/Colors';
import ProductItem from '../../componenets/shop/ProductItem';

import * as CartActions from '../../store/actions/cart';
import * as ProductActions from '../../store/actions/products';

const ProductsOverviewScreen = (props)=>{

    const navigateToCart = ()=>{
        props.navigation.navigate('Cart');
    }

    useEffect(
        ()=>{
            props.navigation.setParams({
                'toCart': navigateToCart
            });
        }, []
    )   
    useEffect(
        ()=>{
            props.initProducts();
        }, []
    )
    
    const productToCartClicked = (item)=>{    
        props.addToCart({
            id: item.id,
            price: item.price,
            title: item.title,
            qty:1
        });
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

ProductsOverviewScreen.navigationOptions = (navigationData)=>
{
    return{
        headerTitle: 'All Products',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Drawer'
                iconName='md-menu'
                onPress={
                    ()=>{
                        navigationData.navigation.toggleDrawer();
                    }
                }/>
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Cart'
                iconName='md-cart'
                onPress={
                    ()=>{
                        let f = navigationData.navigation.getParam('toCart');
                        f();
                    }
                }/>
        </HeaderButtons>
    }   
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
        'products': state.products.availableProducts       
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        'addToCart': (item)=>dispatch({
            type: CartActions.ADD_ITEM,
            payload: item
        }),
        'initProducts': ()=>dispatch(ProductActions.InitProducts())
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsOverviewScreen);