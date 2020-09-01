import React, { useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Text
 } from 'react-native';
 
 import { HeaderButtons, Item } from 'react-navigation-header-buttons';
 import HeaderButton from '../../UI/HeaderButton';

import { connect } from 'react-redux';

import Colors from '../../constants/Colors';
import ProductItem from '../../componenets/shop/ProductItem';

import * as CartActions from '../../store/actions/cart';
import * as ProductActions from '../../store/actions/products';
import * as UserActions from '../../store/actions/user';

const ProductsOverviewScreen = (props)=>{

    const navigateToCart = ()=>{
        props.navigation.navigate('Cart');
    }

    const logout = ()=>{
        //console.log('logout');
        props.logOutUser();
        props.navigation.navigate('Auth');
    }

    useEffect(
        ()=>{
            props.initProducts();
            props.navigation.setParams({
                'toCart': navigateToCart,
                'logout': logout
            });            
        }, []
    );

    useEffect(
        ()=>{   
            props.navigation.setParams({
                'cartItemsCount': props.cartItemsCount
            });
        }, [props.cartItemsCount]
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
        headerLeft: ()=>{
            return(
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='Drawer'
                        iconName='md-menu'
                        onPress={
                            ()=>{
                                navigationData.navigation.toggleDrawer();
                            }
                        }/>
                </HeaderButtons>
            )
        },
        headerRight: ()=>{
            return(
                <View style={styles.iconStyle}>
                    <Text style={styles.cartCountStyle}>{navigationData.navigation.getParam('cartItemsCount')}</Text>                    
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item 
                            title='Logout'
                            iconName='ios-log-out'
                            onPress={
                                ()=>{
                                    let f = navigationData.navigation.getParam('logout');
                                    f();
                                }
                            }
                        />
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
                </View>
               
            )
        }
    }   
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10
    },
    iconStyle:{
    },
    cartCountStyle:{
        position: 'absolute',
        top: -15,
        right: 10,
        zIndex: 100,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    }
  });

const mapStateToProps = (state)=>{
    return{
        'products': state.products.availableProducts,
        'cartItemsCount': state.cart.itemsCount
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        'addToCart': (item)=>dispatch({
            type: CartActions.ADD_ITEM,
            payload: item
        }),
        'initProducts': ()=>dispatch(ProductActions.InitProducts()),
        'logOutUser': ()=>dispatch({ type: UserActions.LOG_OUT_USER })
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsOverviewScreen);