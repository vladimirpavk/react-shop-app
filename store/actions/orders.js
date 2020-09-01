export const ADD_ORDER = "ADD ORDER";
export const FETCH_ORDERS = "FETCH ORDERS";
export const UPDATE_ORDERS = "UPDATE ORDERS";

import Order from '../../models/Order';

export const AddOrder = (item)=>{
    return dispatch=>{
        return fetch(`https://rn-store-app-73c67.firebaseio.com/orders/${item.userId}.json`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(
            response=>response.json()
        ).then(
            response => {
                dispatch({
                    type: ADD_ORDER,
                    payload: new Order(
                        response.name,
                        item.dateStart,
                        item.status,
                        item.cartItem
                    )
                })
            }
        )
    }
}

export const FetchOrders = (userId) => {
    return dispatch=>{
        return fetch(`https://rn-store-app-73c67.firebaseio.com/orders/${userId}.json`,{
            method: 'GET',
            headers:{               
                'content-type': 'application/json'
            }
        }).then(
            response=>response.json()
        ).then(
            response=>{                               
                let newArray = [];
                Object.keys(response).forEach(
                    (key)=>{
                        newArray.push(new Order(
                            key,
                            response[key].dateStart,
                            response[key].status,
                            response[key].cartItem
                        ))
                    }
                );
                //console.log('actions/orders.js', newArray);
                dispatch({
                    type: FETCH_ORDERS,
                    payload: newArray
                });
            }
        ).catch(
            (error)=>{
                console.log(error);
            }
        )
    }
}

export const UpdateOrders = (itemToUpdate, userId)=>{    
    return dispatch=>{
        const newItem = {
            'cartItem': itemToUpdate.cartItem,
            'dateStart': itemToUpdate.dateStart,
            'status': 'Confirmed'
        }
        return fetch(`https://rn-store-app-73c67.firebaseio.com/orders/${userId}/${itemToUpdate.id}.json`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(newItem)            
        }).then(
            (response)=>{
                //console.log(response);
                dispatch({
                    type: UPDATE_ORDERS,
                    payload: {...itemToUpdate, 'status': 'Confirmed'}
                })
            }
        )
    }
}