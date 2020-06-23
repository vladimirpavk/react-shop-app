import PRODUCTS from '../../data/dummy-data';

const initialState = {
    availableProducts: PRODUCTS
}

export const reducer = (state=initialState, action)=>{
    switch(action.type){
        case(''):{
            
        }
        default:
            return state
    }
}