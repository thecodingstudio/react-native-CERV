import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const Roles = props => {
    return (
        <View style={{...props.style,...styles.container}} >
            <TouchableOpacity onPress={props.onClick} >
                <View style={styles.imageContainer} >
                    <Image style={styles.image} source={props.image}/>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title} >{props.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    image:{
        height:'100%',
        width:'100%',
        borderColor: Colors.grey,
        borderWidth:1
    },
    container:{
        marginTop:10
    },
    imageContainer:{
        borderRadius:64,
        borderWidth:1,
        borderColor:Colors.grey,
        overflow:'hidden',
        height: 150,
        width:150
    },
    title:{
        fontWeight:'bold',
        fontSize:25,
        color: Colors.grey    
    },
    titleContainer:{
        alignItems:'center'
    }
});

export default Roles;