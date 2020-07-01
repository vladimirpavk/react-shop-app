import * as Action from '../actions/cart';

const initialState = {
    items: [],
    totalAmount : 0
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case Action.ADD_ITEM:{
            return {
                ...state,
                items: [...state.items, action.payload],
                totalAmount: state.totalAmount+action.payload.price
            }
        }
        default:
            return state;
    }
}

export default reducer;