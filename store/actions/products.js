import Products from '../../data/dummy-data';

export const DELETE_PRODUCTS = 'DELETE PRODUCTS';
export const FILTER_PRODUCTS = 'FILTER PRODUCTS';
export const UPDATE_PRODUCT = 'UPDATE PRODUCT';
export const ADD_PRODUCT = 'ADD PRODUCT';
export const INIT_PRODUCTS = 'INIT PRODUCTS';

export const InitProducts = ()=>{    
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
    return (dispatch)=>{
        return fetch('https://rn-store-app-73c67.firebaseio.com/products.json',{
            method: 'POST',
            headers:{
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                ownerId: item.ownerId,
                imageUrl: item.imageUrl,
                description: item.description,
                price: item.price,
                title: item.price
            })
        }).then(
            (responseData)=>responseData.json()        
        ).then(
            (response)=>{            
                    dispatch({
                        type: ADD_PRODUCT,
                        payload: {
                            ...item,
                            id: response.name                        
                        }
                    })
        }).catch(
            (error)=>{
                console.log(error);
            }
        );      
    }      
}

export const EditProduct = (item)=>{
    return dispatch=>{
        return fetch(`https://rn-store-app-73c67.firebaseio.com/products/${item.id}.json`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(item)
        }).then(
            (response)=>{
                //console.log(response);
                dispatch({
                    type: UPDATE_PRODUCT,
                    payload: item
                });
            }).catch(
                (error)=>{
                    console.log(error);
                }
            )                  
    }
}

export const DeleteProduct = (itemId)=>{
    return dispatch=>{
        return fetch(`https://rn-store-app-73c67.firebaseio.com/products/${itemId}.json`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'Application/json'
            }
        }).then(
            (response)=>{
                //console.log(response);
                dispatch({
                    type: DELETE_PRODUCTS,
                    payload: itemId
                });
            }).catch(
                (error)=>{
                    console.log(error);
                })
    }
}