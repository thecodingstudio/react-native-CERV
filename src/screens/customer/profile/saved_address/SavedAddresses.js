import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';

import * as addressActions from '../../../../store/actions/address'
import AddressItem from "../../../../components/AddressItem";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../../../commonconfig";
import { getPostLogin, postPostLogin } from "../../../../helpers/ApiHelpers";

const SavedAddresses = props => {
    
    const [ isLoading, setIsLoading ] = useState(false)
    const [ addressList, setAddressList ] = useState()
    const [ length, setLength ] = useState()
    const dispatch = useDispatch()

    const getAddresses = async() => {
        setIsLoading(true)
        const response = await getPostLogin('/get-address')
        // console.log(response.data);
        setAddressList(response.data.data)
        setLength(response.data.length)
        setIsLoading(false)
    }
    
    useEffect( () => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getAddresses()
        });
        return unsubscribe;
    },[ props.navigation ])


    if(isLoading) {
        return (
            <View style={{...styles.screen, justifyContent:'center'}}>
                <ActivityIndicator size={75} color={Colors.ORANGE}/>
            </View>
        )
    }

    const tag = (address_type) => {
        if(address_type === 0) return "Home"
        if(address_type === 1) return "Work"
        if(address_type === 2) return "Other"
    }

    const renderAddressItem = (itemData) => {
        const addressObj = itemData.item
        return (
            <TouchableOpacity style={styles.addressItem} onPress={ () => { props.navigation.navigate('EditAddress', { addressObj }) } } >
                <View>
                    <Text style={styles.tag}>{tag(itemData.item.address_type)}</Text>
                    <Text style={styles.address}>{itemData.item.address}</Text>
                </View>
                <TouchableOpacity onPress={ () =>  onPressActive(itemData.item)}>
                    {itemData.item.is_active ? <Ionicon name="radio-button-on" size={25} color={Colors.ORANGE}/> : <Ionicon name="radio-button-off" size={25} color={Colors.GREY}/> }
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    const onPressActive = async(item) => {
        const data = {
            addressId: item.id
        }
        const activeResponse = await postPostLogin('/activate-address',data)
        // console.log(activeResponse);
        if(activeResponse.success) {
            dispatch(addressActions.activateAddress(activeResponse.data.data))
            Toast.show('Address activated successfully.')
            getAddresses()
        } else {
            console.log(activeResponse.data);
        }
    }

    return (
        <View style={styles.screen}>
            {
                length === 0 ? 
                (
                    <View style={styles.centerAlign}>
                        <Text style={styles.backDropTitle}>No Addresses Found</Text>
                        <Text style={styles.backDropText}>Add some now!</Text>
                    </View>
                ) 
                : 
                (
                    <View>
                        <FlatList 
                            data={addressList}
                            keyExtractor = { item => item.id }
                            renderItem = { renderAddressItem }
                        />
                    </View>
                )
            }
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:15
    },
    centerAlign:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    backDropTitle:{
        fontWeight:'bold',
        fontSize:30,
        color: Colors.GREY
    },
    backDropText:{
        fontWeight:'bold',
        fontSize:20,
        color: Colors.LIGHTER_GREY
    },
    addressItem:{
        justifyContent:'space-between',
        alignItems:'center',
        height:90,
        // backgroundColor: Colors.STAR_YELLOW,
        flexDirection:'row',
        paddingHorizontal:10,
        borderBottomColor: Colors.GREY,
        borderBottomWidth: 0.75
    },
    tag:{
        fontWeight:'bold',
        fontSize:23
    },
    address:{
        fontWeight:'600',
        fontSize:18
    }
});

export default SavedAddresses;