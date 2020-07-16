import Products from '../../data/dummy-data';

export const DELETE_PRODUCTS = 'DELETE PRODUCTS';
export const FILTER_PRODUCTS = 'FILTER PRODUCTS';
export const UPDATE_PRODUCT = 'UPDATE PRODUCT';
export const ADD_PRODUCT = 'ADD PRODUCT';
export const INIT_PRODUCTS = 'INIT PRODUCTS';

export const InitProducts = (item)=>{
    

    return({
        type: INIT_PRODUCTS,
        payload: items
    });
}