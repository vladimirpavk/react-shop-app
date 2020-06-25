import React from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Image,
    Button
 } from 'react-native';

 import Colors from '../../constants/Colors';

import { connect, useSelector } from 'react-redux';

const RenderItem = (props)=>{
    console.log(props.item.imageUrl);

    const ViewDetailsClicked = ()=>{
        console.log('View Details clicked...');
    }
    
    const ToCartClicked = ()=>{
        console.log('To Cart clicked...');
    }

    return(
        <View style={styles.renderItemContainer}>
            <View style={styles.renderItemPic}>
                <Image
                    style={{flex:1}}
                    source={{
                        uri:props.item.imageUrl
                    }}
                />
            </View>
            <View style={styles.renderItemDetails}>
                <Text style={{fontWeight: 'bold', marginBottom: 5}}>{props.item.title}</Text>
                <Text style={{fontWeight: '100'}}>${props.item.price}</Text>
                <View style={styles.renderItemButtons}>
                    <Button
                        style={styles.renderItemButton}
                        title="View Details"
                        onPress={()=>ViewDetailsClicked}
                    />
                    <Button
                        style={styles.renderItemButton}
                        title="To Cart"
                        onPress={()=>ToCartClicked}
                    />
                </View>
            </View>
        </View>
    );
}

const ProductsOverviewScreen = (props)=>{
    console.log('ProductOverviewScreen...');
    return(
        <View style={styles.container}>      
            <FlatList                
                data={props.products}
                keyExtractor={(item)=>item.id}
                renderItem={(itemData)=><RenderItem item={itemData.item}></RenderItem>}
            />
        </View>
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
};

const styles = StyleSheet.create({
    container: {
      flex: 1,     
      borderColor: 'red',
      borderWidth: 2,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10
    },
    renderItemContainer: {    
        borderColor: 'green',
        borderWidth: 1,
        height: 300,
        marginBottom: 20,
        borderRadius: 10
    },
    renderItemPic:{
        borderColor: 'blue',
        borderWidth:2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: '70%'
    },
    renderItemDetails:{
        borderWidth: 2,
        borderColor: 'blue',
        height: '30%',
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    renderItemButtons:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 2,
        width: '100%'
    },
    renderItemButton:{
        backgroundColor: Colors.primary
    }

  });

const mapStateToProps = (state)=>{
    return{
        products: state.products.availableProducts
    }
}

export default connect(mapStateToProps)(ProductsOverviewScreen);