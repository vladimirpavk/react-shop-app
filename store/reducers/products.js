import PRODUCTS from '../../data/dummy-data';

import * as ProductsAction from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    filteredProducts: []
}

export const reducer = (state=initialState, action)=>{
    switch(action.type){     
        case(ProductsAction.FILTER_PRODUCTS):{
            //action.payload === ownerId
            let filteredProducts = state.availableProducts.filter(
                (product)=>{
                    return product.ownerId===action.payload                    
                }
            );
            return{
                ...state,
                filteredProducts: [...filteredProducts]
            }
        }
        case(''):{

        }
        default:
            return state
    }
}

export default reducer;