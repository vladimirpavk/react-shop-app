export const LOG_USER_IN = 'LOG USER IN';

import { User } from '../../models/User';

import { FirebaseWebAPIKey } from '../../secureAPIKeys';

export const logUserIn = (email, password)=>{
    console.log(FirebaseWebAPIKey);
    
    return RegisterUser(
        email,
        password,
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'
    );
}

export const signUserIn = (email, password)=>{
    return RegisterUser(
        email,
        password,
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp'
    );
}

export const RegisterUser = (email, password, url)=>{
    return dispatch=>{
        return fetch(`${url}?key=${FirebaseWebAPIKey}`,{
                method: 'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({
                    'email' : email,
                    'password' : password,
                    'returnSecureToken' : 'true'
                })
            }
        ).then(
            (response)=>{
                return response.json();
            }
        ).then(
            (response)=>{
                //console.log(response);
                dispatch({
                    'type': LOG_USER_IN,
                    'payload': new User(response.idToken, response.email, response.localId, response.refreshToken)                    
                });
            }
        )
    }
}