import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { SliderBox } from "react-native-image-slider-box";
import FastImage from 'react-native-fast-image';

import discountCouponsBanners from '../../../model/discountCouponBanners';
import Addresses from '../../../model/addresses';

const HomeScreen = props => {

    const activeAddress = Addresses.find(item => {return(item.isActive===true)})

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
                    <TouchableOpacity onPress={ () => { props.navigation.navigate('Filter')}} >
                        <Feather name="filter" size={25} color="black"/>
                    </TouchableOpacity>
                </View>
            </View>
            
        </>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;