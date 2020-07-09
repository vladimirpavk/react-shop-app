import React, { useEffect } from 'react';

import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';

import { connect } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../UI/HeaderButton';

import * as ProductAction from '../../store/actions/products';

import ProductItem from '../../componenets/shop/ProductItem';

const UserProductsScreen = (props)=>{
    
    useEffect(
        ()=>{
            props.filterProducts('u1');
        }, []
    );    

    const editClicked = (item)=>{
        console.log('editClicked', item)
    };

    const deleteClicked = (item)=>{
        console.log('deleteclicked', item);
    };

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
        flex: 1
    }
});

const mapStateToProps = (state)=>{
    return{
        filteredProducts: state.products.filteredProducts       
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        'filterProducts': (userId)=>dispatch({
            type: ProductAction.FILTER_PRODUCTS,
            payload: userId
        })
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProductsScreen);