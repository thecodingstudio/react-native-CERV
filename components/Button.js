import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const CustomButton = props => {
    return(
        <TouchableOpacity onPress={props.onPress} >
            <View style={{...props.style,...styles.container}}>
                <Text style={styles.title} >{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.orange,
        height:55,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    },
    title:{
        fontWeight:'bold',
        fontSize:25,
        padding:2.5
    }
});

export default CustomButton;