import * as UserActions from '../actions/user';

import { User } from '../../models/User';

const initialState = {};

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case UserActions.LOG_USER_IN:{
            return{
                idToken: action.payload.idToken,
                email: action.payload.email,
                localId: action.payload.localId,
                refreshToken: action.payload.refreshToken
            }
        }
        default:{
            return state;            
        }
    }
}

export default reducer;

