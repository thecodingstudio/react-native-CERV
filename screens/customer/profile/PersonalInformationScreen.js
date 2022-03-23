import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Colors from "../../../constants/Colors";
import Users from "../../../model/users";

const PersonalInformationScreen = props => {
    return (
        <View style={styles.screen}>
            
            {/* PROFILE PICTURE */}
            <View style={styles.ppContainer}>
                <Image source={{uri: Users.profile_picture }} style={styles.ppImage}/>
            </View>

            {/* DETAILS */}

            {/* Username */}
            <View style={styles.detailItem}>
                <Text style={styles.text_footer}>Username</Text>
                <View style={styles.action} >
                    <FontAwesome name="user" color={Colors.orange} size={20}/>
                    <View style={styles.input}>
                        <Text style={styles.value}>{Users.username}</Text>
                    </View>
                </View>
            </View>

            {/* Email */}
            <View style={styles.detailItem}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action} >
                    <FontAwesome name="envelope" color={Colors.orange} size={20}/>
                    <View style={styles.input}>
                        <Text style={styles.value}>{Users.email}</Text>
                    </View>
                </View>
            </View>

            {/* Phone Number */}
            <View style={styles.detailItem}>
                <Text style={styles.text_footer}>Phone Number</Text>
                <View style={styles.action} >
                    <FontAwesome name="phone" color={Colors.orange} size={20}/>
                    <View style={styles.input}>
                        <Text style={styles.value}>{Users.phone_number}</Text>
                    </View>
                </View>
            </View>

            {/* Postcode */}
            <View style={styles.detailItem}>
                <Text style={styles.text_footer}>Home Postcode</Text>
                <View style={styles.action} >
                    <FontAwesome name="home" color={Colors.orange} size={20}/>
                    <View style={styles.input}>
                        <Text style={styles.value}>{Users.post_code}</Text>
                    </View>
                </View>
            </View>

            {/* Edit Info Button */}
            <View style={{width:'100%', justifyContent:'center'}}>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('EditDetails')
                }}>
                    <View style={styles.button}>
                        <Text style={styles.editText}>Edit Information</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        backgroundColor:'white'
    },
    detailItem:{
        width:'85%',
        marginTop: 15
    },
    ppContainer:{
        borderRadius:90,
        overflow:'hidden',
        marginVertical: 25
    },
    ppImage:{
        height:180,
        width:180
    },
    text_footer:{
        color:Colors.grey,
        fontSize:15,
        fontWeight:'bold',
        marginVertical:5
    },
    input:{
        marginLeft: 15
    },
    action:{
        flexDirection:'row',
        marginTop:10,
        borderBottomWidth:0.5,
        borderBottomColor:Colors.grey,
        paddingBottom: 10
    },
    value:{
        fontSize:17,
        fontWeight:'700'
    },
    button:{
        backgroundColor:Colors.orange,
        width:'90%',
        height:50,
        justifyContent:'center',
        borderRadius:10,
        marginTop: 50,
        marginHorizontal:'5%'
    },
    editText:{
        textAlign:'center',
        color:'white',
        fontSize:20,
        fontWeight:'700'
    }
});

export default PersonalInformationScreen;