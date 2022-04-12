import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, StatusBar } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import Caterer from '../../../model/caterer';
import discountCouponsBanners from '../../../model/discountCouponBanners';
import HeartIconHome from '../../../components/HeartIconHome';

import{ Colors } from '../../../commonconfig';

const windowWidth = Dimensions.get("window").width;

const HomeScreen = props => {

    const activeAddress = useSelector( state => state.Address.activeAddress)

    const tabBartHeight = useBottomTabBarHeight();

    const Stars = props => {
        let rating = props.rating;
        let disp = []

        for (var i = 1; i <= 5; i++) {
            let star = <Ionicon name="star" size={18} color={Colors.STAR_YELLOW} key={i}/>
            if (i > rating) {
                star = <Ionicon name="star-outline" size={18} color={Colors.GREY} key={i}/>
            }
            disp.push(star);
        }

        return (<View style={{ flexDirection: 'row' }} >{disp}</View>)

    }

    const renderCarouselItem = ({item}, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={item}
                    containerStyle={styles.imageContainer}
                    style={styles.imageCarousel}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
            </View>
        );
    }

    return (
        <View style={{paddingBottom: tabBartHeight+20}}>
            <StatusBar backgroundColor={Colors.WHITE} barStyle='dark-content'/>

            {/* Address Bar */}
            <View style={{backgroundColor:'#fff', height:60, flexDirection:'row'}}>
                <View style={{flex:0.6, justifyContent:'center',paddingLeft:10}}>
                    <TouchableOpacity onPress={ () => { props.navigation.navigate('Profile',{ screen:'SavedAddresses', initial:false })}}>
                        <Text style={{fontWeight:'600', color:'#777777'}} >My Event Location</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:12, fontWeight:'bold'}}>{activeAddress.address ? activeAddress.address : 'Add a new address'}</Text>
                            <Ionicon name="caret-down" color="#2EE742" size={15}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>
                <Carousel
                    sliderWidth={windowWidth}
                    sliderHeight={windowWidth}
                    itemWidth={windowWidth - 60}
                    data={discountCouponsBanners}
                    renderItem={renderCarouselItem}
                    hasParallaxImages={true}
                    loop={true}
                    autoplay={true}
                    enableSnap={true}
                    lockScrollWhileSnapping={true}
                    autoplayInterval={3000}
                    loopClonesPerSide={10}
                />

                
                <View style={{alignItems:'center'}}>
                    <View style={{marginVertical:15,flexDirection:'row',width:'90%',alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={{fontSize:20, fontWeight:'bold'}} >Near By Caterers</Text>
                        <TouchableOpacity onPress={ () => { props.navigation.navigate('Sort')}} >
                            <Feather name="filter" size={25} color="black"/>
                        </TouchableOpacity>
                    </View>

                    {Caterer.map((c) => {
                        return ( 
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Details',{catererId: c.id}) }} key={c.id} >
                            <View style={{width: windowWidth * 0.9, height:250, marginVertical:5, borderRadius:15,overflow: 'hidden', alignItems:'center'}}>
                                <Image source={{ uri: c.image }} style={styles.image} />
                                <View style={styles.detailContainer}>
                                    <View>
                                        <Text style={{ fontWeight: 'bold' }}>{c.name}</Text>
                                        <Text style={{ fontWeight: '800', marginTop: 3 }} >{c.address}</Text>
                                        <Text style={{fontWeight: '800', marginTop: 3 }}>$ {c.price} / Per Dish</Text>
                                        <View style={{ marginTop: 3 }} >
                                            <Stars rating={c.rating} />
                                        </View>
                                    </View>
                                    <HeartIconHome initialState={c.isFavourite}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
            
        </View>
    );
};

const styles = StyleSheet.create({
    image: { 
        flex: 9, 
        height: 250, 
        width: '100%' 
    },
    detailContainer: { 
        flex: 3, 
        flexDirection: 'row', 
        backgroundColor: Colors.WHITE, 
        width: '100%', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 20 
    },
    item: {
        width: windowWidth - 60,
        height: 200,
        marginTop:10
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
    },
    imageCarousel: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
    },
});

export default HomeScreen;