import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, StatusBar, ActivityIndicator, FlatList } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { Rating } from 'react-native-ratings';
import messaging from '@react-native-firebase/messaging';

import{ Colors } from '../../../commonconfig';
import { getPreLogin } from '../../../helpers/ApiHelpers';

const windowWidth = Dimensions.get("window").width;

const HomeScreen = props => {

    // useEffect( () => {
    //     messaging().getToken().then(token => { console.log(token) });
    // },[])
    const [ catererList, setCatererList ] = useState([])
    const [ bannerList, setBannerList ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    
    useEffect( () => {
        getCaterer();
        getBanners();
        setIsLoading(false)
    },[])
    
    const getCaterer = async() => {
        const response = await getPreLogin('/caterers')
        // console.log("GET CATERERS RESPONSE      \n\n\n\n",JSON.stringify(response));
        if(response.success) {
            setCatererList(response.data.caterer)
        } else {
            Toast.show('No Caterers available currently!')
        }
    }
    
    const getBanners = async() => {
        const response = await getPreLogin('/get-banners')
        if(response.success) {
            setBannerList(response.data.banners)
            // console.log("Banners:   ", bannerList);
        } else {
            console.log(response);
        }
    }
    
    const activeAddress = useSelector( state => state.Address.activeAddress)
    const tabBartHeight = useBottomTabBarHeight();
    
    const renderBanner = itemData => {
        // console.log(itemData.item);
        return (
            <View style={{paddingVertical:15, width: windowWidth*0.9, marginHorizontal: 25}}>
                <Image source={{uri: itemData.item.image}} style={{ width: '100%', height: 200}} resizeMode={'stretch'}/>
            </View>
        )
    }

    return (
        <View style={{paddingBottom: tabBartHeight + 20, backgroundColor: Colors.BACKGROUND_GREY}}>
            <StatusBar backgroundColor={Colors.WHITE} barStyle='dark-content'/>

            {/* Address Bar */}
            <View style={{backgroundColor:'#fff', height:60, flexDirection:'row'}}>
                <View style={{flex:0.6, justifyContent:'center',paddingLeft:10}}>
                    <TouchableOpacity onPress={ () => { props.navigation.navigate('Profile',{ screen:'SavedAddresses' })}}>
                        <Text style={{fontWeight:'600', color:'#777777'}} >My Event Location</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:12, fontWeight:'bold'}}>{activeAddress.address ? activeAddress.address : 'Add a new address'}</Text>
                            <Ionicon name="caret-down" color="#2EE742" size={15}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            { isLoading ?
            <View style={styles.loader}>
                <StatusBar backgroundColor={Colors.WHITE} barStyle='dark-content'/>
                <ActivityIndicator size={65} color={Colors.ORANGE} />
            </View> 
            :
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}}>
            {/* Discount Banners */}
                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data = { bannerList }
                    renderItem = { renderBanner }
                    keyExtractor = { item => item.id }
                />
        
            {/* Caterers */}
            <View style={styles.nearByContainer}>
                <Text style={styles.label}>Near by Caterers</Text>
                <TouchableOpacity>
                    <Ionicon name="funnel-outline" size={25} color={Colors.BLACK}/>
                </TouchableOpacity>
            </View>

            {catererList.map( item => {
                // console.log("\n\nCaterer:       ",item);
                return (
                    <TouchableOpacity 
                        style={styles.catererItemContainer} 
                        key={item.userId} 
                        onPress = { () => { props.navigation.navigate('Details', { caterer: item ,catererId : item.userId }) } }
                    >
                        <View style={{flex:2}}>
                            <Image source={{uri: item.user.image}} style={{width:'100%', height:'100%'}} />
                        </View>
                        <View style={styles.catererDetailContainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.catererName}>{item.user.name}</Text>
                                <Text style={styles.catererAddress}>{item.address}</Text>
                                {/* <Stars rating = {item.rating} /> */}
                                <View style={{alignItems:'flex-start'}}>
                                    <Rating
                                        ratingColor={Colors.STAR_YELLOW}
                                        readonly
                                        startingValue={item.rating}
                                        imageSize = {20}
                                    />
                                </View>
                            </View>
                            <View style={styles.iconContainer}>
                                <TouchableOpacity>
                                    <Ionicon name="heart-outline" color={Colors.GREY} size={30}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            } )}

            </ScrollView>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    loader:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    nearByContainer:{
        width: windowWidth,
        padding:10,
        // backgroundColor: Colors.CREATE_BLUE,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    label:{
        fontWeight:'bold',
        fontSize:20,
    },
    catererItemContainer:{
        width: windowWidth * 0.9,
        height:250,
        alignSelf:'center',
        borderRadius:15, 
        overflow:'hidden',
        marginVertical:10,
        backgroundColor: Colors.WHITE
    },
    catererDetailContainer:{
        flex:1, 
        flexDirection:'row'
    },
    textContainer:{
        flex:4, 
        justifyContent:'space-evenly', 
        paddingVertical:5,
        paddingHorizontal:20
    },
    iconContainer:{
        flex:1, 
        justifyContent:'center',
        alignItems:'center'
    },
    catererName:{
        fontWeight:'bold',
        fontSize:18
    },
    catererAddress:{
        fontWeight:'600',
        fontSize:15
    }
});

export default HomeScreen;