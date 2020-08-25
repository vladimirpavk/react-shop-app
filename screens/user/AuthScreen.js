import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';
import { setLightEstimationEnabled } from 'expo/build/AR';

const AuthScreen = (props)=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <View style={styles.container}>
            <Text>Email</Text>
            <TextInput
                value={email}
                onChangeText={(value)=>{setEmail(value)}}
            />
            <Text>Password</Text>
            <TextInput 
                value={password}
                onChangeText={(value)=>{setPassword(value)}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderColor: 'black'
    }
});

export default AuthScreen;