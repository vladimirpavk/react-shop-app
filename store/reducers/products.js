import PRODUCTS from '../../data/dummy-data';

import * as ProductsAction from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    filteredProducts: []
}

export const reducer = (state=initialState, action)=>{
    switch(action.type){     
        case(ProductsAction.DELETE_PRODUCTS):{
            //action.payload === productId
            let filteredArray = state.availableProducts.filter(
                product=>product.id !== action.payload
            );
            return{
                ...state,
                availableProducts: filteredArray
            };
        }
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
        case ProductsAction.UPDATE_PRODUCT:{
            //action.payload === item to update           

            const updatedArray = state.availableProducts.map(
                (item)=>{
                    if(item.id===action.payload.id){                        
                        return action.payload
                    }
                    return item;
                }
            );            
            return{
                ...state,
                availableProducts: [...updatedArray]
            }
        }      
        case ProductsAction.ADD_PRODUCT:{            
            return{
                ...state,
                availableProducts: [...state.availableProducts, action.payload]
            }
        }
        default:
            return state
    }
}

export default reducer;