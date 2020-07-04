import * as Action from '../actions/cart';

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
                    totalAmount: state.totalAmount + action.payload.price                    
                }
            }
            else{
                return {
                    ...state,
                    items: [...state.items, action.payload],
                    totalAmount: state.totalAmount+action.payload.price
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
                totalAmount: state.totalAmount-action.payload.price
            }
        }
        default:
            return state;
    }
}

export default reducer;