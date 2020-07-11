import React, { useState, useEffect } from 'react';
import{
    View,
    StyleSheet,
    Text,
    TextInput    
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../UI/HeaderButton';

import { connect } from 'react-redux';
import * as ProductActions from '../../store/actions/products';

const EditProductScreen = (props)=>{   
    const item = props.navigation.getParam('item');

    const [title, setTitle] = useState(item ? item.title : '');
    const [description, setDescription] = useState(item ? item.description : '');
    const [image, setImage] = useState(item ? item.imageUrl : '');
    const [price, setPrice] = useState(item ? item.price : '');

    useEffect(
        ()=>{
            props.navigation.setParams({
                newItem:{
                    id: item.id,
                    ownerId: item.ownerId,
                    title: title,
                    description: description,
                    image: image,
                    price: price
                }
            });
        }, [title, description, image, price]
    )

    useEffect(
        ()=>{
            props.navigation.setParams({
                updateState: props.updateItem
            })
        }, []
    )
    

    return(
        <View style={styles.container}>
            <Text style={styles.labelStyle}>Title</Text>
            <TextInput
                style={styles.inputStyle}
                value={title}
                onChangeText={(text)=>setTitle(text)}
            />
            <Text style={styles.labelStyle}>Description</Text>
            <TextInput
                style={styles.inputStyle}
                value={description}
                onChangeText={(text)=>setDescription(text)}
                multiline={true}
                numberOfLines={4}
            />
            <Text style={styles.labelStyle}>Image</Text>
            <TextInput
                style={styles.inputStyle}
                value={image}
                onChangeText={(text)=>setImage(text)}
            />
            <Text style={styles.labelStyle}>Price($)</Text>
            <TextInput
                style={styles.inputStyle}
                value={price.toString()}
                onChangeText={(text)=>setPrice(text)}
            />
        </View>
    )
}

EditProductScreen.navigationOptions = (navData)=>{
    //console.log('new item', navData.navigation.getParam('newItem'));

    return {        
        headerTitle: 'Edit Product - ' + navData.navigation.getParam('item').title,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Cart'
                iconName='md-checkmark'
                onPress={
                    ()=>{
                        //console.log('Checkmark clicked...');
                        let f=navData.navigation.getParam('updateState');
                        f(navData.navigation.getParam('newItem'));
                    }
                }/>
        </HeaderButtons>
    }      
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10
    },
    labelStyle:{
        fontFamily: 'roboto-bold',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    inputStyle:{
        fontFamily: 'roboto',
        fontSize: 24,
        marginBottom: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    }
})

const mapDispatchToProps=(dispatch)=>{
    return{
        'updateItem': (item)=>dispatch({
            type: ProductActions.UPDATE_PRODUCT,
            payload: item
        })
    }
}

export default connect(null, mapDispatchToProps)(EditProductScreen);