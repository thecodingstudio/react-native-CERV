import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import AddressItem from "../../../../components/AddressItem";
import { useSelector } from "react-redux";

const SavedAddresses = props => {

    const addressList = useSelector( state => {
        const tempList = [];
        for( const key in state.Address.addresses ) {
            tempList.push({
                ...state.Address.addresses[key]
            });
        }
        return tempList.sort((a,b) => a.id > b.id ? 1 : -1);
    })
    const activeAddress = useSelector( state => state.Address.activeAddress)

    const renderGridItem = itemData => {
        return <AddressItem 
            id = { itemData.item.id }
            tag = { itemData.item.tag }
            address = { itemData.item.address }
            isActive = { itemData.item.id === activeAddress.id ? true : false }
        />
    }

    return (
        <View style={styles.screen}>
            <FlatList
                data={addressList}
                renderItem={renderGridItem}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default SavedAddresses;