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
            return newState;
        }
        default:{
            return state;
        }  
    }        
}

const EditProductScreen = (props)=>{   
    const item = props.navigation.getParam('item');   
    const mode = props.navigation.getParam('mode');

    const initialFormState = {
        inputValues:{
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

    const updateTitle= (text)=>{
        let validation=true;
        if(text.length===0) validation = false;
        
        dispatch({
            type: 'UPDATE_INPUT_VALUES',
            fieldName: 'title',
            fieldValue: text,
            filedValidationName: 'isTitleValid',
            filedValidationValue: validation
        });
    }

    const updateDescription = (text)=>{
        let validation = true;
        if(text.length < 10) validation=false;

        dispatch({
            type: 'UPDATE_INPUT_VALUES',
            fieldName: 'description',
            fieldValue: text,
            filedValidationName: 'isDescValid',
            filedValidationValue: validation
        });
    }

    const updateImageUrl = (text)=>{
        let validation = true;
        if(text.length < 25) validation=false;

        dispatch({
            type: 'UPDATE_INPUT_VALUES',
            fieldName: 'imageUrl',
            fieldValue: text,
            filedValidationName: 'isImageUrlValid',
            filedValidationValue: validation
        });
    }

    const updatePrice = (text)=>{
        let validation = true;
        if(+text===0) validation=false;

        dispatch({
            type: 'UPDATE_INPUT_VALUES',
            fieldName: 'price',
            fieldValue: text,
            filedValidationName: 'isPriceValid',
            filedValidationValue: validation
        });
    }

   /*  const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);
    const [image, setImage] = useState(item.imageUrl);
    const [price, setPrice] = useState(item.price); 

    useEffect(
        ()=>{
            props.navigation.setParams({
                newItem: new Product(item.id, item.ownerId, title, image, description)              
            });
        }, [title, description, image, price]
    )

    useEffect(
        ()=>{
            props.navigation.setParams({
                updateState: props.updateItem,
                addToState: props.addItem
            })
        }, []
    ) */
    

    return(
        <View style={styles.container}>
            <Text style={styles.labelStyle}>Title</Text>
            <TextInput
                style={styles.inputStyle}
                value={state.inputValues.title}
                onChangeText={(text)=>updateTitle(text)}
            />
            {
                !state.inputValidities.isTitleValid ?
                <Text>* Field can not be empty</Text> : null
            }            
            <Text style={styles.labelStyle}>Description</Text>
            <TextInput
                style={styles.inputStyle}
                value={state.inputValues.description}
                onChangeText={(text)=>updateDescription(text)}
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
                onChangeText={(text)=>updateImageUrl(text)}
            />
             {
                !state.inputValidities.isDescValid ?
                <Text>* Field must be at least 25 chars length</Text> : null
            }
            <Text style={styles.labelStyle}>Price($)</Text>
            <TextInput
                style={styles.inputStyle}
                value={state.inputValues.price.toString()}
                onChangeText={(text)=>updatePrice(text)}
            />
            {
                !state.inputValidities.isPriceValid ?
                <Text>* Price can not be 0</Text> : null
            }
        </View>
    )
}

EditProductScreen.navigationOptions = (navData)=>{
  /*   //console.log(navData.navigation.getParam('newItem'));
    const newItem = navData.navigation.getParam('newItem');
    if(newItem){
        return {        
            headerTitle: navData.navigation.getParam('item').title!=='' ? 'Edit Product - ' + navData.navigation.getParam('item').title : 'New Product',
            headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Cart'
                    iconName='md-checkmark'
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
    }  */
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