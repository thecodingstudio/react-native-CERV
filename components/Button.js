import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/Colors';

const CustomButton = props => {
    return(
        <TouchableOpacity onPress={props.onPress} >
            <Animatable.View animation="fadeInUpBig" duration={500} style={{...props.style,...styles.container}}>
                <Text style={styles.title} >{props.title}</Text>
            </Animatable.View>
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
        padding:2.5,
        color:'white'
    }
});

export default CustomButton;