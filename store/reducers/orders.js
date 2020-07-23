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
        default:
            return state;
    }
}

export default reducer;