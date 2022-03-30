import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { SliderBox } from "react-native-image-slider-box";
import FastImage from 'react-native-fast-image';

import Caterer from '../../../model/caterer';
import discountCouponsBanners from '../../../model/discountCouponBanners';
import Addresses from '../../../model/addresses';
import HeartIconHome from '../../../components/HeartIconHome';

const HomeScreen = props => {

    const windowWidth = Dimensions.get("window").width;

    const activeAddress = Addresses.find(item => {return(item.isActive===true)})

    const Stars = props => {
        let rating = props.rating;
        let disp = []

        for (var i = 1; i <= 5; i++) {
            let star = <Ionicon name="star" size={18} color="#F0E010" key={i}/>
            if (i > rating) {
                star = <Ionicon name="star-outline" size={18} color="grey" key={i}/>
            }
            disp.push(star);
        }

        return (<View style={{ flexDirection: 'row' }} >{disp}</View>)

    }

    return (
        <>
            {/* Address Bar */}
            <View style={{backgroundColor:'#fff', height:60, flexDirection:'row'}}>
                <View style={{flex:0.6, justifyContent:'center',paddingLeft:10}}>
                    <TouchableOpacity onPress={ () => { props.navigation.navigate('SavedAddresses')}}>
                        <Text style={{fontWeight:'600', color:'#777777'}} >My Event Location</Text>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:12, fontWeight:'bold'}}>{activeAddress.address}</Text>
                            <Ionicon name="caret-down" color="#2EE742" size={15}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>
                <SliderBox
                    ImageComponent={FastImage}
                    images={discountCouponsBanners}
                    sliderBoxHeight={200}
                    onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                    dotColor="#FFEE58"
                    inactiveDotColor="#90A4AE"
                    paginationBoxVerticalPadding={20}
                    autoplay
                    circleLoop
                    resizeMethod={'resize'}
                    resizeMode={'cover'}
                    paginationBoxStyle={{
                        position: "absolute",
                        bottom: 0,
                        padding: 0,
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        paddingVertical: 10
                    }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 0,
                        padding: 0,
                        margin: 0,
                        backgroundColor: "rgba(0, 255, 255, 0.92)"
                    }}
                    ImageComponentStyle={{borderRadius: 15, width: '90%', marginTop: 15}}
                    imageLoadingColor="#2196F3"
                />
                
                <View style={{alignItems:'center'}}>
                    <View style={{marginVertical:15,flexDirection:'row',width:'90%',alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={{fontSize:20, fontWeight:'bold'}} >Near By Caterers</Text>
                        <TouchableOpacity onPress={ () => { props.navigation.navigate('Sort')}} >
                            <Feather name="filter" size={25} color="black"/>
                        </TouchableOpacity>
                    </View>

                    {Caterer.map(function(c){
                        return ( 
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Details',{catererId: c.id}) }} key={c.id} >
                            <View style={{width: windowWidth * 0.9, height:250, backgroundColor:'#A086D5', marginVertical:5, borderRadius:15,overflow: 'hidden', alignItems:'center'}}>
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
            
        </>
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
        backgroundColor: 'white', 
        width: '100%', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 20 }
});

export default HomeScreen;