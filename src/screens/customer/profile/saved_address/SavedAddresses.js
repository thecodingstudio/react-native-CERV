import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as addressActions from '../../../../store/actions/address'
import AddressItem from "../../../../components/AddressItem";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../../../CommonConfig";
import { getPostLogin, postPostLogin } from "../../../../helpers/ApiHelpers";

const SavedAddresses = props => {

    const [ loading, setLoading ] = useState(true)
    const [ addresses, setAddresses ] = useState([])
    const [ length, setLength ] = useState(0)
    const [ activeAddress, setActiveAddress ] = useState( {} )
    // console.log(activeAddress)

    useEffect( async() => {
        setActiveAddress( JSON.parse( await AsyncStorage.getItem('activeAddress')))
    },[])

    useEffect( () => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getAddresses()
        });
        return unsubscribe;
    }, [ props.navigation ])

    const getAddresses = async() => {
        setLoading(true)
        const addressResponse = await getPostLogin('/get-address')
        // console.log(addressResponse)
        if(addressResponse.success) {
            setAddresses(addressResponse.data.data)
            setLength(addressResponse.data.length)
            setLoading(false)
        } else {
            console.log(addressResponse)
            setLoading(false)
        }

    }

    const tag = (address_type) => {
        if(address_type === 0) return "Home"
        if(address_type === 1) return "Work"
        if(address_type === 2) return "Other"
    }

    const activateAddressHandler = async() => {
        if( Object.keys(activeAddress ? activeAddress : {} ).length === 0 ){
            Toast.show('Please select an address to activate!')
        } else {
            // console.log(activeAddress)
            await AsyncStorage.setItem('activeAddress', JSON.stringify(activeAddress))
            Toast.show('Address activated successfully!')
            props.navigation.goBack()
        }

    }

    const renderAddressItem = (itemData) => {
        // console.log(itemData)
        const addressObj = itemData.item
        return(
            <TouchableOpacity style={styles.addressItem} onPress={ () => { props.navigation.navigate('EditAddress', { addressObj }) } } >
                <View style={{flex:5,justifyContent:'space-evenly', height:'100%', paddingHorizontal:10}}>
                    <Text style={styles.addressTag}>{ tag(addressObj.address_type) }</Text>
                    <Text style={styles.address}>{ addressObj.address }</Text>
                </View>
                <View style={{flex:1, alignItems:'center', justifyContent:'center', height:'100%'}}>
                    <TouchableOpacity onPress={() => { setActiveAddress(addressObj) }}>
                        <Ionicon name={ activeAddress?.id === addressObj.id ? 'radio-button-on' : 'radio-button-off' } size={30} color={activeAddress?.id === addressObj.id ? Colors.ORANGE : Colors.GREY }/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    if(loading) {
        return (
            <View style={[styles.screen, { alignItems:'center', justifyContent:'center' }]}>
                <ActivityIndicator size={65} color={Colors.ORANGE}/>
            </View>
        )
    }

    return(
        <View style={styles.screen}>
            {
                length > 0 ? 
                    //Render Addresses
                    <View>
                        <FlatList 
                            data={addresses}
                            keyExtractor = { item => item.id }
                            renderItem = { renderAddressItem }
                        />
                    </View>
                    :
                    //Backdrop Text
                    <View style={styles.backDropContainer}>
                        <Text style={styles.backDropTitle}>No Addresses Found</Text>
                        <Text style={styles.backDropText}>Add some now!</Text>
                    </View>
            }
            {
                length > 0 ?
                    //Render Activate
                    <TouchableOpacity style={styles.activateBtn} onPress={activateAddressHandler}>
                        <Text style={styles.activateText}>ACTIVATE ADDRESS</Text>
                    </TouchableOpacity>
                    :
                    null
            }
        </View>
    )

}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:20, 
        backgroundColor: Colors.BACKGROUND_GREY,
        alignItems:'center',
        justifyContent:'space-between'
    },
    backDropContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
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
    activateBtn:{
        paddingVertical:15,
        backgroundColor: Colors.ORANGE,
        width:'90%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        position:'absolute',
        bottom:10
    },
    activateText:{
        fontWeight: 'bold',
        color: Colors.WHITE,
        fontSize:18
    },
    addressItem:{
        justifyContent:'space-between',
        alignItems:'center',
        height:90,
        width:'100%',
        // backgroundColor: Colors.STAR_YELLOW,
        flexDirection:'row',
        borderBottomColor: Colors.GREY,
        borderBottomWidth: 0.75,
        marginBottom: 10
    },
    addressTag:{
        fontWeight:'bold',
        fontSize:20,
        flex:1,
        textAlignVertical:'center'
    },
    address:{
        flex:1.5,
        fontSize:16,
        color: Colors.GREY,
    }
})

export default SavedAddresses;

// const [ isLoading, setIsLoading ] = useState(false)
//     const [ addressList, setAddressList ] = useState()
//     const [ length, setLength ] = useState()
//     const dispatch = useDispatch()

//     const getAddresses = async() => {
//         setIsLoading(true)
//         const response = await getPostLogin('/get-address')
//         // console.log(response.data);
//         setAddressList(response.data.data)
//         setLength(response.data.length)
//         setIsLoading(false)
//     }
    
//     useEffect( () => {
//         const unsubscribe = props.navigation.addListener('focus', () => {
//             getAddresses()
//         });
//         return unsubscribe;
//     },[ props.navigation ])


//     if(isLoading) {
//         return (
//             <View style={{...styles.screen, justifyContent:'center'}}>
//                 <ActivityIndicator size={75} color={Colors.ORANGE}/>
//             </View>
//         )
//     }

//     const tag = (address_type) => {
//         if(address_type === 0) return "Home"
//         if(address_type === 1) return "Work"
//         if(address_type === 2) return "Other"
//     }

//     const renderAddressItem = (itemData) => {
//         const addressObj = itemData.item
//         return (
            
//         )
//     }

//     const onPressActive = async(item) => {
//         const data = {
//             addressId: item.id
//         }
//         const activeResponse = await postPostLogin('/activate-address',data)
//         // console.log(activeResponse);
//         if(activeResponse.success) {
//             dispatch(addressActions.activateAddress(activeResponse.data.data))
//             Toast.show('Address activated successfully.')
//             getAddresses()
//         } else {
//             console.log(activeResponse.data);
//         }
//     }

//     return (
//         <View style={styles.screen}>
//             {
//                 length === 0 ? 
//                 (
//                     <View style={styles.centerAlign}>
                        
//                     </View>
//                 ) 
//                 : 
//                 (
//                     <View>
                        
//                     </View>
//                 )
//             }
//             <TouchableOpacity>
//                 <Text>Activate Address</Text>
//             </TouchableOpacity>
//         </View>
//     )
// };

// const styles = StyleSheet.create({
//     screen:{
//         flex:1,
//         padding:15
//     },
//     centerAlign:{
//         flex:1,
//         alignItems:'center',
//         justifyContent:'center'
//     },
//     backDropTitle:{
//         fontWeight:'bold',
//         fontSize:30,
//         color: Colors.GREY
//     },
//     backDropText:{
//         fontWeight:'bold',
//         fontSize:20,
//         color: Colors.LIGHTER_GREY
//     },
//     addressItem:{
//         justifyContent:'space-between',
//         alignItems:'center',
//         height:90,
//         // backgroundColor: Colors.STAR_YELLOW,
//         flexDirection:'row',
//         paddingHorizontal:10,
//         borderBottomColor: Colors.GREY,
//         borderBottomWidth: 0.75
//     },
//     tag:{
//         fontWeight:'bold',
//         fontSize:23
//     },
//     address:{
//         fontWeight:'600',
//         fontSize:18
//     }
// });