import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, StatusBar, ActivityIndicator, FlatList } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { Rating } from 'react-native-ratings';
import RBSheet from 'react-native-raw-bottom-sheet';
import GetLocation from 'react-native-get-location';

import { Colors } from '../../../CommonConfig';
import { getPostLogin } from '../../../helpers/ApiHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get("window").width;

const HomeScreen = props => {
    
    const filterSheet = useRef(null)
    const [filter, setFilter] = useState()

    const [catererList, setCatererList] = useState([])
    const [bannerList, setBannerList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeAddress, setActiveAddress] = useState({})

    const [ location , setLocation ] = useState({
        latitude: 0,
        longitude: 0
    })

    useEffect( () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true
        })
        .then( (location) => {
            // console.log("Current Location:\n",location)
            setLocation({ latitude: location.latitude, longitude: location.longitude })
        })
        .catch( (err) => {
            console.log(err)
        })
    } , [])

    useEffect(() => {
        getCaterer();
        getAddresses();
        getBanners();
        setIsLoading(false)
    }, [isLoading,location])

    
    const getAddresses = async () => {
        const response = await getPostLogin('/get-address')
        // console.log(response);
        if (response.success) {
            // setAddresses()
            const aAddress = response.data.data.find(item => { return (item.is_active === true) })
            setActiveAddress(aAddress)
            AsyncStorage.setItem('activeAddress', JSON.stringify(aAddress))
            // console.log(aAddress)
            if(aAddress && location.longitude === 0 && location.latitude === 0) {
                setLocation({ latitude: aAddress.latitude, longitude: aAddress.longitude })
            }
        } else {
            console.log(response);
        }
    }

    const getCaterer = async () => {

        const response = await getPostLogin(`/caterers/${location.latitude}/${location.longitude}`)
        // console.log("GET CATERERS RESPONSE      \n",response);
        if (response.success) {
            setCatererList(response.data.caterer)
        } else {
            Toast.show('No Caterers available currently!')
        }
    }

    const getBanners = async () => {
        const response = await getPostLogin('/get-banners')
        if (response.success) {
            setBannerList(response.data.banners)
            // console.log("Banners:   ", bannerList);
        } else {
            console.log("\n\n", response);
        }
    }

    // const activeAddress = useSelector( state => state.Address.activeAddress)
    const tabBartHeight = useBottomTabBarHeight();

    const renderBanner = itemData => {
        // console.log(itemData.item);
        return (
            <View style={{ paddingVertical: 15, width: windowWidth * 0.9, marginHorizontal: 25 }}>
                <Image source={{ uri: itemData.item.image }} style={{ width: '100%', height: 200 }} resizeMode={'stretch'} />
            </View>
        )
    }

    const applyFilterHandler = async() => {
        filterSheet.current.close()
        setIsLoading(true)
        const filterParam = filter === 1 ? 'rating' : filter === 2 ? 'descPrice' : 'ascPrice'
        // console.log(filterParam);
        const filterResponse = await getPostLogin(`/caterers/${filterParam}`)
        // console.log("\n\nFilter Response:",filterResponse);
        if (filterResponse.success) {
            setCatererList(filterResponse.data.caterer)
        } else {
            Toast.show('No Caterers available currently!')
        }
        setIsLoading(false)
    }


    return (
        <View style={{ paddingBottom: tabBartHeight + 20, backgroundColor: Colors.BACKGROUND_GREY, height: '100%' }}>
            <StatusBar backgroundColor={Colors.WHITE} barStyle='dark-content' />

            {/* Address Bar */}
            <View style={{ backgroundColor: '#fff', height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 0.6, justifyContent: 'center', paddingLeft: 10 }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Profile', { screen: 'SavedAddresses' }) }}>
                        <Text style={{ fontWeight: '600', color: '#777777' }} >My Event Location</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{activeAddress ? activeAddress.address : 'Add a new address'}</Text>
                            <Ionicon name="caret-down" color="#2EE742" size={15} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {isLoading ?
                <View style={styles.loader}>
                    <StatusBar backgroundColor={Colors.WHITE} barStyle='dark-content' />
                    <ActivityIndicator size={65} color={Colors.ORANGE} />
                </View>
                :
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    {/* Discount Banners */}
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={bannerList}
                        renderItem={renderBanner}
                        keyExtractor={item => item.id}
                    />

                    {/* Caterers */}
                    <View style={styles.nearByContainer}>
                        <Text style={styles.label}>Near by Caterers</Text>
                        <TouchableOpacity onPress={() => { filterSheet.current.open() }}>
                            <Ionicon name="funnel-outline" size={25} color={Colors.BLACK} />
                        </TouchableOpacity>
                    </View>

                    {catererList.map(item => {
                        // console.log("\n\nCaterer:       ",item);
                        return (
                            <TouchableOpacity
                                style={styles.catererItemContainer}
                                key={item.id}
                                onPress={() => { props.navigation.navigate('Details', { caterer: item, catererId: item.caterer.id }) }}
                            >
                                <View style={{ flex: 2 }}>
                                    <Image source={{ uri: item.caterer.image }} style={{ width: '100%', height: '100%' }} />
                                </View>
                                <View style={styles.catererDetailContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.catererName}>{item.caterer.name}</Text>
                                        <Text style={styles.catererAddress}>{item.address}</Text>
                                        {/* <Stars rating = {item.rating} /> */}
                                        <View style={{ alignItems: 'flex-start' }}>
                                            <Rating
                                                ratingColor={Colors.STAR_YELLOW}
                                                readonly
                                                startingValue={item.rating}
                                                imageSize={20}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.iconContainer}>
                                        <TouchableOpacity>
                                            <Ionicon name="heart-outline" color={Colors.GREY} size={30} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}

                </ScrollView>
            }
            <RBSheet
                ref={filterSheet}
                closeOnDragDown={false}
                // closeOnPressMask={false}
                // closeOnPressBack={false}
                dragFromTopOnly
                animationType='fade'
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.5)"
                    },
                    container: {
                        height: Dimensions.get('screen').height * 0.35 ,
                        backgroundColor: Colors.WHITE,
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                    }
                }}
            >
                <StatusBar backgroundColor='rgba(0,0,0,0.5)' />
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ flex: 5,paddingHorizontal:15, justifyContent: 'space-evenly' }}>

                        <Text style={[styles.bottomSheetButtonText,{ color: Colors.BLACK }]}>FILTERS</Text>
                        <View>
                            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginVertical:5}} onPress={() => { setFilter(1) }}>   
                                <Ionicon name={ filter === 1 ? 'radio-button-on' : 'radio-button-off'} size={30} color={ filter === 1 ? Colors.ORANGE : Colors.GREY }/>
                                <Text style={{fontWeight:'bold', fontSize: 18, color: Colors.BLACK}}>Sort by Rating</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginVertical:5}} onPress={() => { setFilter(2) }}>   
                                <Ionicon name={ filter === 2 ? 'radio-button-on' : 'radio-button-off'} size={30} color={ filter === 2 ? Colors.ORANGE : Colors.GREY }/>
                                <Text style={{fontWeight:'bold', fontSize: 18, color: Colors.BLACK}}>Sort by Price ( High to Low )</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginVertical:5}} onPress={() => { setFilter(3) }}>   
                                <Ionicon name={ filter === 3 ? 'radio-button-on' : 'radio-button-off'} size={30} color={ filter === 3 ? Colors.ORANGE : Colors.GREY }/>
                                <Text style={{fontWeight:'bold', fontSize: 18, color: Colors.BLACK}}>Sort by Price ( Low to High )</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ flex: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={styles.bottomSheetButton} onPress={ () => { filterSheet.current.close() } } activeOpacity={0.75}>
                            <Text style={styles.bottomSheetButtonText}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bottomSheetButton} onPress={ applyFilterHandler } activeOpacity={0.75}>
                            <Text style={styles.bottomSheetButtonText}>APPLY</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </RBSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    loader: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    nearByContainer: {
        width: windowWidth,
        padding: 10,
        // backgroundColor: Colors.CREATE_BLUE,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    catererItemContainer: {
        width: windowWidth * 0.9,
        height: 250,
        alignSelf: 'center',
        borderRadius: 15,
        overflow: 'hidden',
        marginVertical: 10,
        backgroundColor: Colors.WHITE
    },
    catererDetailContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    textContainer: {
        flex: 4,
        justifyContent: 'space-evenly',
        paddingVertical: 5,
        paddingHorizontal: 20
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    catererName: {
        fontWeight: 'bold',
        fontSize: 18
    },
    catererAddress: {
        fontWeight: '600',
        fontSize: 15
    },
    bottomSheetButton:{
        alignItems: 'center', 
        justifyContent: 'center', 
        flex: 1, 
        height:'100%',
        backgroundColor: Colors.ORANGE
    },
    bottomSheetButtonText:{
        fontWeight:'bold',
        color: Colors.WHITE,
        fontSize: 18
    }
});

export default HomeScreen;