import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text, ImageBackground, Image, Dimensions } from "react-native";
import FavouriteCardItem from "../../../components/FavouriteCardItem";
import Ionicon from 'react-native-vector-icons/Ionicons';

import Caterer from '../../../model/caterer';
import { TouchableOpacity } from "react-native-gesture-handler";

const MyFavourites = props => {

    const favCaterers = Caterer.filter(item => { return(item.isFavourite === true)});    

    const renderGridItem = itemData => {
        return( 
            <FavouriteCardItem 
                key = { itemData.item.id }
                image = { itemData.item.image }
                name = { itemData.item.name }
                address = { itemData.item.address }
                rating = { itemData.item.rating }
                isFavourite = { itemData.item.isFavourite }
            />
        )

    }

    return (
        <View style={styles.screen}>
            <FlatList data={favCaterers} keyExtractor={item => item.id} renderItem={renderGridItem}/>
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#DFE6E1'
    }
});

export default MyFavourites;