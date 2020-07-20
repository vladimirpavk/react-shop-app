import Products from '../../data/dummy-data';

export const DELETE_PRODUCTS = 'DELETE PRODUCTS';
export const FILTER_PRODUCTS = 'FILTER PRODUCTS';
export const UPDATE_PRODUCT = 'UPDATE PRODUCT';
export const ADD_PRODUCT = 'ADD PRODUCT';
export const INIT_PRODUCTS = 'INIT PRODUCTS';

export const InitProducts = ()=>{    
    console.log('InitProducts = ()=>');

    return (dispatch)=>{
        return fetch('https://rn-store-app-73c67.firebaseio.com/products.json',{
            method: 'GET',
            headers:{               
                'content-type': 'application/json'
            }
        }).then(
            (responseData)=>{
                return responseData.json();            
            }
        ).then(
            (data)=>{
                let newArray = [];

                Object.keys(data).forEach(
                    (key)=>{
                        newArray.push({
                            id: key,
                            ...data[key]
                        })
                    }
                );              
                                
                dispatch({
                    type: INIT_PRODUCTS,
                    payload: newArray
                });
            }
        ).catch(
            (error)=>{
                console.log(error);
            }
        );         
    }
}

export const AddProduct = (item)=>{    
    fetch('https://rn-store-app-73c67.firebaseio.com/products.json',{
        method: 'POST',
        headers:{
            'Content-Type': 'Application/json'
        },
        body: {
            "item1": "vladimirpavk",
            "item2": "pavlepavkovic"
        }
    }).then(
        (responseData)=>{
            console.log(responseData);            
        }
    ).catch(
        (error)=>{
            console.log(error);
        }
    );      

    return dispatch=>{
            dispatch({
                type: 'ADD_PRODUCT',
                payload: item
            })
        }
    }