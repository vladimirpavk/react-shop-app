import * as OrdersActions from '../actions/orders';

import Order from '../../models/Order';

const initialState= {
    orders: []
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case(OrdersActions.ADD_ORDER):{
            return {
                ...state,
                orders:[...state.orders, action.payload]
            }      
        }
        case(OrdersActions.FETCH_ORDERS):{
            return{
                ...state,
                orders: [...action.payload]
            }
        }
        case(OrdersActions.UPDATE_ORDERS):{
            const newArray = state.orders.map(
                (item)=>{
                    if(item.id === action.payload.id){
                        return action.payload
                    }
                    return item;
                }
            )
            return{             
                ...state,
                orders: [...newArray]   
            }
        }
        default:
            return state;
    }
}

export default reducer;