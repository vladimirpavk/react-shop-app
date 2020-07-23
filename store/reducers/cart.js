import * as Action from '../actions/cart';

import CartItem from '../../models/CartItem';

const initialState = {
    items: [],
    totalAmount : 0
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case Action.ADD_ITEM:{                        
            let isUpdated = false;

            let updatedQtyItem = state.items.map(
                (item)=>{
                    if(item.id === action.payload.id){
                        item.qty = item.qty+1;
                        isUpdated = true;
                        return item;
                    }
                    return item;
                }
            );

            if(isUpdated){
                return{
                    ...state,
                    items: updatedQtyItem,
                    totalAmount: +(state.totalAmount + action.payload.price).toFixed(2)
                }
            }
            else{
                return {
                    ...state,
                    items: [...state.items,
                            new CartItem(
                                action.payload.id,
                                action.payload.price,
                                action.payload.title,
                                action.payload.qty                                
                            )],
                    totalAmount: +(state.totalAmount+action.payload.price).toFixed(2)
                }
            }            
        }
        case Action.DELETE_ITEM:{
            let updatedItems = state.items.filter(
                (item)=>{
                    if(item.id !== action.payload.id){                                          
                        return item;
                    }                    
                }
            );

            return{
                items: updatedItems,
                totalAmount: +(state.totalAmount-action.payload.qty*action.payload.price).toFixed(2)
            }
        }
        case Action.CLEAR_CART:{
            return{
                items: [],
                totalAmount: 0
            }
        }
        default:
            return state;
    }
}

export default reducer;