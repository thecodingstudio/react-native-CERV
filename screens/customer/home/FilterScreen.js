import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Colors from "../../../constants/Colors";

const FilterScreen = props => {
    return(
        <View style={styles.screen}>
            <Text style={{textAlign:'left',fontSize:25,fontWeight:'bold',marginBottom:30,marginLeft:'5%'}}>Filter</Text>
            
            <View style={{alignItems:'center'}}>
                {/* Ratings */}
                <View style={{width:'90%', height:60, borderBottomColor:'#ddd', borderBottomWidth:1,marginVertical:5,flexDirection:'row',justifyContent:'space-between', alignItems:'center'}} >
                    <Text style={{fontSize:20, fontWeight:'900'}} >Caterers by Ratings</Text>
                    <Ionicon name="radio-button-on-outline" size={25} color={Colors.orange}/>
                </View>
                
                {/* Price ( L -> H ) */}
                <View style={{width:'90%', height:60, borderBottomColor:'#ddd', borderBottomWidth:1,marginVertical:5,flexDirection:'row',justifyContent:'space-between', alignItems:'center'}} >
                    <Text style={{fontSize:20, fontWeight:'900'}} >Caterers by Price Low to High</Text>
                    <Ionicon name="radio-button-on-outline" size={25} color={Colors.orange}/>
                </View>
                
                {/* Price ( H -> L ) */}
                <View style={{width:'90%', height:60, borderBottomColor:'#ddd', borderBottomWidth:1,marginVertical:5,flexDirection:'row',justifyContent:'space-between', alignItems:'center'}} >
                    <Text style={{fontSize:20, fontWeight:'900'}} >Caterers by Price High to Low</Text>
                    <Ionicon name="radio-button-on-outline" size={25} color={Colors.orange}/>
                </View>
                
                {/* Distance */}
                <View style={{width:'90%', height:60, borderBottomColor:'#ddd', borderBottomWidth:1,marginVertical:5,flexDirection:'row',justifyContent:'space-between', alignItems:'center'}} >
                    <Text style={{fontSize:20, fontWeight:'900'}} >Caterers by Distance</Text>
                    <Ionicon name="radio-button-on-outline" size={25} color={Colors.orange}/>
                </View>

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'flex-end',
    }
});

export default FilterScreen;
