export const ADD_ORDER = "ADD ORDER";

import Order from '../../models/Order';

export const AddOrder = (item)=>{
    return dispatch=>{
        return fetch('https://rn-store-app-73c67.firebaseio.com/orders.json',{
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