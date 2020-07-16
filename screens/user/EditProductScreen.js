import React, { useState, useEffect, useReducer } from 'react';
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
import Product from '../../models/product';

const reducer = (state, action)=>{
    switch(action.type){
        case 'UPDATE_INPUT_VALUES':{

            const newState = {
                ...state,
                inputValues:{
                    ...state.inputValues,
                    [action.fieldName] : action.fieldValue
                },
                inputValidities:{
                    ...state.inputValidities,
                    [action.filedValidationName] : action.filedValidationValue
                }
            };          
            
            let isFormValid = true;
            Object.keys(newState.inputValidities).forEach(
                (key)=>{
                    //console.log((newState.inputValidities)[key]);
                    isFormValid = isFormValid && (newState.inputValidities)[key]
                }
            )  
            const newState2 = {
                ...newState,
                isFormValid: isFormValid
            };
            return newState2;
        }
        default:{
            return state;
        }  
    }        
}

const validation = (fieldName, fieldValue)=>{
    let validate=true;

    switch(fieldName){
        case('title'):{
            //console.log('title validation');
            if(fieldValue.length===0){
                validate = false;                
            }                
            break;
        }
        case('description'):{
            //console.log('description validation')
            if(fieldValue.length < 10){
                validate=false;
            }
            break;
        }
        case('imageUrl'):{
            //console.log('imageUrl validation')
            if(fieldValue.length < 25){
                validate=false;
            }
            break;
        }
        case('price'):{
            //console.log('price validation')
            if(isNaN(fieldValue) || +fieldValue===0){
                validate=false;
            }
            break;
        }
        default:{
            return validate;
        }
    }
    //console.log('validation function', validate);
    return validate;
}

const EditProductScreen = (props)=>{   
    const item = props.navigation.getParam('item');   
    const mode = props.navigation.getParam('mode');
    
    const initialFormState = {
        inputValues:{
            id: item.id,
            ownerId: item.ownerId,
            title: item.title,
            description: item.description,
            imageUrl: item.imageUrl,
            price: item.price
        },
        inputValidities:{
            isTitleValid: mode==='new' ? false : true,
            isDescValid: mode==='new' ? false : true,
            isImageUrlValid: mode==='new' ? false : true,
            isPriceValid: mode==='new' ? false : true
        },
        isFormValid: mode==='new' ? false : true
    };

    const [state, dispatch] = useReducer(reducer, initialFormState);

    const update = (text, fieldName, fieldValidationName)=>{    
        
        const isValid = validation(fieldName, text)         

        dispatch({
            type: 'UPDATE_INPUT_VALUES',
            fieldName: fieldName,
            fieldValue: text,
            filedValidationName: fieldValidationName,
            filedValidationValue: isValid
        });
    }   

    useEffect(
        ()=>{
            props.navigation.setParams({
                newItem: state.inputValues,
                isFormValid: state.isFormValid
            })
        }, [state]
    );

    useEffect(
        ()=>{
            props.navigation.setParams({
                'addToState' : props.addItem,
                'updateState' : props.updateItem
            })
        }, []
    );
    
    return(
        <View style={styles.container}>
            <Text style={styles.labelStyle}>Title</Text>
            <TextInput
                style={styles.inputStyle}
                value={state.inputValues.title}
                onChangeText={(text)=>update(text, 'title', 'isTitleValid')}
            />
            {
                !state.inputValidities.isTitleValid ?
                <Text>* Field can not be empty</Text> : null
            }            
            <Text style={styles.labelStyle}>Description</Text>
            <TextInput
                style={styles.inputStyle}
                value={state.inputValues.description}
                onChangeText={(text)=>update(text, 'description', 'isDescValid')}
                multiline={true}
                numberOfLines={4}
            />
            {
                !state.inputValidities.isDescValid ?
                <Text>* Field must be at least 10 chars length</Text> : null
            }
            <Text style={styles.labelStyle}>Image</Text>
            <TextInput
                style={styles.inputStyle}
                value={state.inputValues.imageUrl}
                onChangeText={(text)=>update(text, 'imageUrl', 'isImageUrlValid')}
            />
             {
                !state.inputValidities.isImageUrlValid ?
                <Text>* Field must be at least 25 chars length</Text> : null
            }
            <Text style={styles.labelStyle}>Price($)</Text>
            <TextInput
                style={styles.inputStyle}
                value={state.inputValues.price.toString()}
                onChangeText={(text)=>update(text, 'price', 'isPriceValid')}
            />
            {
                !state.inputValidities.isPriceValid ?
                <Text>* Price can not be 0 nad must be a number</Text> : null
            }
        </View>
    )
}

EditProductScreen.navigationOptions = (navData)=>{
    const newItem = navData.navigation.getParam('newItem');    
    const isFormValid = navData.navigation.getParam('isFormValid');
    const item = navData.navigation.getParam('item');

    if(newItem){
        return {        
            headerTitle: item.title!=='' ? 'Edit Product - ' + item.title : 'New Product',
            headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    disabled={isFormValid ? false : true}
                    title='Cart'
                    iconName={isFormValid ? 'md-checkmark' : 'md-alert'}
                    onPress={
                        ()=>{
                            //console.log('Checkmark clicked...');
                            let f;
                            if(navData.navigation.getParam('mode')==='new'){

                                f=navData.navigation.getParam('addToState');
                            }                            
                            else{
                                f=navData.navigation.getParam('updateState');                        
                            }        
                            //console.log('New Item', newItem);
                            f(newItem);
                            navData.navigation.goBack();
                        }
                    }/>
            </HeaderButtons>
        }
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
        }),
        'addItem': (item)=>dispatch({
            type: ProductActions.ADD_PRODUCT,
            payload: item
        })        
    }
}

export default connect(null, mapDispatchToProps)(EditProductScreen);