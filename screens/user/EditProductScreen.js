import React, { useState } from 'react';
import{
    View,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';

const EditProductScreen = (props)=>{   
    const item = props.navigation.getParam('item');
    const [title, setTitle] = useState(item ? item.title : '');
    const [description, setDescription] = useState(item ? item.description : '');
    const [image, setImage] = useState(item ? item.imageUrl : '');
    const [price, setPrice] = useState(item ? item.price : '');

    return(
        <View style={styles.container}>
            <Text style={styles.labelStyle}>Title</Text>
            <TextInput
                style={styles.inputStyle}
                value={title}
                onChangeText={(text)=>setTitle(text)}
            />
            <Text style={styles.labelStyle}>Description</Text>
            <TextInput
                style={styles.inputStyle}
                value={description}
                onChangeText={(text)=>setDescription(text)}
                multiline={true}
                numberOfLines={4}
            />
            <Text style={styles.labelStyle}>Image</Text>
            <TextInput
                style={styles.inputStyle}
                value={image}
                onChangeText={(text)=>setImage(text)}
            />
            <Text style={styles.labelStyle}>Price($)</Text>
            <TextInput
                style={styles.inputStyle}
                value={price.toString()}
                onChangeText={(text)=>setPrice(text)}
            />
        </View>
    )
}

EditProductScreen.navigationOptions = (navData)=>{
    return {        
        headerTitle: 'Edit Product - ' + navData.navigation.getParam('item').title
    }      
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10
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
    }
})

export default EditProductScreen;