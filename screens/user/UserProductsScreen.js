import React, { useEffect } from 'react';

import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';

import { connect } from 'react-redux';

import { AntDesign } from '@expo/vector-icons';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../UI/HeaderButton';

import * as ProductAction from '../../store/actions/products';

import ProductItem from '../../componenets/shop/ProductItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Product from '../../models/Product';

import Products from '../../data/dummy-data';

import * as firebase from 'firebase/app';

const UserProductsScreen = (props)=>{

    var defDb = firebase.database();
    
    useEffect(
        ()=>{
            props.filterProducts('u1');
        }, [props.availableProducts]
    );    

    const editClicked = (item)=>{
        //console.log('editClicked', item)
        props.navigation.navigate({
            routeName: 'EditProduct',
            params:{
                'item': item
            }
        });
    };

    const deleteClicked = (item)=>{
        //console.log('deleteclicked', item);
        props.deleteProduct(item.id);
    };

    const addNewItemPressed = ()=>{    
        defDb.
        console.log('addNewItemPressed');
        fetch('https://rn-store-app-73c67.firebaseio.com/products.json',{
            method: 'POST',
            headers:{
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(Products)
        }).then(
            (responseData)=>{
                console.log(responseData)
            }
        ).catch(
            (error)=>{
                console.log(error);
            }
        );
    /*     props.navigation.navigate({
            routeName: 'EditProduct',
            params:{
                'item': new Product('xxx', 'u1', '', '', '', ''),               
                'mode': 'new'
            }
        }); */
    }

    return(
        <View style={styles.container}>      
            <FlatList               
                data={props.filteredProducts}
                keyExtractor={(item)=>item.id}
                renderItem={
                    (itemData)=>{
                        return(
                            <ProductItem
                                item={itemData.item}
                                editClicked={()=>editClicked(itemData.item)}
                                deleteClicked={()=>deleteClicked(itemData.item)}>
                            </ProductItem>
                            );
                    }
                }
            />
            <AntDesign
                name="pluscircle"
                style={styles.newProductIcon}
                size={50}
                color="blue"
                onPress={addNewItemPressed}
            />
        </View>
    )
}

UserProductsScreen.navigationOptions = (navData)=>{
    return {        
        headerTitle: 'My Products',
        headerLeft: ()=>{
            return(
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Drawer'
                    iconName='md-menu'
                    onPress={
                        ()=>{
                            navData.navigation.toggleDrawer();
                        }
                    }/>
                </HeaderButtons>
            )           
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    newProductIcon:{                                
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10,
        zIndex: 100,
        borderColor: 'red',
        borderWidth: 5,
        borderRadius: 30,
        borderColor: 'rgba(0,0,0,0.2)',
        backgroundColor: 'rgba(0,0,0,0.2)'
    }
});

const mapStateToProps = (state)=>{
    return{
        'availableProducts': state.products.availableProducts,
        'filteredProducts': state.products.filteredProducts       
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        'deleteProduct': (productId)=>dispatch({
            type: ProductAction.DELETE_PRODUCTS,
            payload: productId
        }),
        'filterProducts': (userId)=>dispatch({
            type: ProductAction.FILTER_PRODUCTS,
            payload: userId
        })
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProductsScreen);