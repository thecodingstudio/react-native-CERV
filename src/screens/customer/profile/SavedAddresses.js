import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import Addresses from '../../../model/addresses';
import AddressItem from "../../../components/AddressItem";

const SavedAddresses = props => {

    const renderGridItem = itemData => {
        return <AddressItem 
            tag = { itemData.item.tag }
            address = { itemData.item.address }
            isActive = { itemData.item.isActive }
        />
    }

    return (
        <View style={styles.screen}>
            <FlatList
                data={Addresses}
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