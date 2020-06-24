import React from 'react';
import { View, FlatList, Text } from 'react-native';

import { connect } from 'react-redux';

const renderItem = ({imageUrl, description, price})=>{
    console.log(imageUrl, description, price);
}

const ProductsOverviewScreen = (props)=>{
    console.log(props.products);
    return(
        <View>
            <FlatList
                data={props.products}
                keyExtractor={(item)=>item.id}
                renderItem={(itemData)=><Text>{itemData.item.title}}</Text>}
            />
        </View>
    )
}

const mapStateToProps = (state)=>{
    return{
        products: state.availableProducts
    }
}

export default connect(mapStateToProps)(ProductsOverviewScreen);