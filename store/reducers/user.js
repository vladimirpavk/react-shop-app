import * as UserActions from '../actions/user';

import { User } from '../../models/User';

const initialState = {};

const reducer = (state=initialState, action)=>{
    //console.log(action.payload);
    switch(action.type){
        case UserActions.LOG_USER_IN:{
            return{
                ...action.payload
            }
        }
        case(UserActions.LOG_OUT_USER):{
            return {};
        }
        default:{
            return state;            
        }
    }
}

export default reducer;

