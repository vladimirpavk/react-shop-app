import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';

import * as UserActions from '../../store/actions/user';

import { FirebaseWebAPIKey } from '../../secureAPIKeys';

const AuthScreen = (props)=>{
    const [isActive, setIsActive] = useState(false);
    //error
    const [loginError, setLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    //
    const [email, setEmail] = useState('vladimirpa3vk@gmail.com');
    const [password, setPassword] = useState('observer123');

    const loginButtonPressed = async ()=>{
        setIsActive(true);
        try{
            let response = await props.logUserIn(email, password);
            setIsActive(false);
            setLoginError(false);
            setErrorMessage('');
            props.navigation.navigate('App');
        }
        catch(error){        
            setIsActive(false);
            setLoginError(true);          ;
            setErrorMessage(error.message);
            
        }
    }

    const signupButtonPressed = async ()=>{
        setIsActive(true);
        try{
            let response = await props.signUserIn(email, password);
            setIsActive(false);
            setLoginError(false);
            setErrorMessage('');
            props.navigation.navigate('App');
        }   
        catch(error){
            //console.log(error.Error);
            setIsActive(false);
            setLoginError(true);
            setErrorMessage(error.message);
        }     
    } 

    const errorBlock=(
        <View>
            <Text style={styles.errorStyle}>Login failed...</Text> 
            <Text style={styles.errorStyle}>{errorMessage}</Text>
        </View>
    );

    return(
        <View style={styles.container}>
            {
                isActive ? <ActivityIndicator/> :
                            <View style={styles.formContainer}>
                                {loginError ? errorBlock : null }
                                <View style={styles.validationStyle}>
                                <Text style={styles.labelStyle}>Email</Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    value={email}
                                    onChangeText={(value)=>{setEmail(value)}}
                                />
                                <Text style={styles.labelStyle}>Password</Text>
                                <TextInput 
                                    style={styles.inputStyle}
                                    value={password}
                                    onChangeText={(value)=>{setPassword(value)}}
                                    secureTextEntry={true}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    style={styles.buttonStyle}
                                    title="Sign Up"
                                    onPress={signupButtonPressed}/>
                                <Button
                                    style={styles.buttonStyle}
                                    title="Login"
                                    onPress={loginButtonPressed}/>
                            </View>
                        </View>
            }            
        </View>
    );
}

AuthScreen.navigationOptions = (navData)=>{
    return {        
        headerTitle: 'Login/Sign up'
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        borderWidth: 1,
        borderColor: 'black',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    validationStyle:{
        width: '70%',
        height: '200px',
        justifyContent: 'center'
    },
    labelStyle:{
        fontFamily: 'roboto-bold',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    inputStyle:{
        fontFamily: 'roboto',
        fontSize: 24,
        marginBottom: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%'       
    },
    buttonStyle:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    errorStyle:{
        color: 'red'
    },
    formContainer:{
        flex: 1
    }
});

const mapDispatchToProps = (dispatch)=>{
    return{
        'logUserIn': (email, password)=>dispatch(UserActions.logUserIn(email, password)),
        'signUserIn': (email, password)=>dispatch(UserActions.signUserIn(email, password))
    }
}

export default connect(null, mapDispatchToProps)(AuthScreen);