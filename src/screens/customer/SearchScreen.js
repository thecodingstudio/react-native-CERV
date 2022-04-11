import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, StatusBar, TouchableOpacity } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../commonconfig';
import Categories from '../../model/categories';

const SearchScreen = props => {

    const renderGridItem = itemData => {
        return (
            <TouchableOpacity style={styles.itemCard} activeOpacity={0.5}>
                <Image source={{uri: itemData.item.image}} style={styles.itemImage}/>
                <Text style={styles.itemName}>{itemData.item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.screen} >
            <StatusBar backgroundColor={Colors.BACKGROUND_GREY} barStyle='dark-content'/>
            {/* SEARCH BAR */}
            <View style={styles.searchBarContainer}>
                <Ionicon name="search-outline" size={30} color={Colors.BLACK}/>
                <Text style={{fontSize:20, fontWeight:'bold', marginLeft:10}}>Search Bar</Text>
            </View>

            {/* Top Categories */}
            <View style={styles.bodyContainer}>
                <Text style={styles.topCategories}>Top Categories</Text>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={Categories}
                    numColumns={2}
                    keyExtractor={item => item.id}
                    renderItem={renderGridItem}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:20,
        paddingTop:0,
        backgroundColor: Colors.BACKGROUND_GREY
    },
    searchBarContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-start',
        paddingHorizontal:10,
        flexDirection:'row'
    },
    bodyContainer:{
        flex:12,
        paddingHorizontal:5,
        
    },
    topCategories:{
        fontWeight:'900',
        fontSize:25,
        marginVertical:10
    },
    itemCard:{
        flex: 1,
        alignItems: 'center',
        margin:5,
        borderRadius:15,
        backgroundColor:Colors.WHITE,
        paddingVertical:10,
        paddingHorizontal:5
    },
    itemName:{
        fontWeight:'bold',
        fontSize:20
    },
    itemImage:{
        height:140, 
        width:140, 
        borderRadius:15, 
        marginBottom:5
    },
});

export default SearchScreen;