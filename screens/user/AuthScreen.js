import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Button
} from 'react-native';

import { connect } from 'react-redux';

import * as UserActions from '../../store/actions/user';

import { FirebaseWebAPIKey } from '../../secureAPIKeys';

const AuthScreen = (props)=>{
    const [email, setEmail] = useState('vladimirpavk@gmail.rs');
    const [password, setPassword] = useState('observer123');

    const loginButtonPressed = ()=>{
        props.logUserIn(email, password);
    }

    const signupButtonPressed = ()=>{
       props.signUserIn(email, password);
    }

    return(
        <View style={styles.container}>
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
    }
});

const mapDispatchToProps = (dispatch)=>{
    return{
        'logUserIn': (email, password)=>dispatch(UserActions.logUserIn(email, password)),
        'signUserIn': (email, password)=>dispatch(UserActions.signUserIn(email, password))
    }
}

export default connect(null, mapDispatchToProps)(AuthScreen);