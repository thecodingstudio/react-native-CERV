import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, TextInput } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Colors from "../../../constants/Colors";
import Users from "../../../model/users";

const EditDetailScreen = props => {

    const [modalVisible, setModalVisible] = useState(false)

    const [ppImage, setPPImage] = useState(Users.profile_picture);

    const ppChangeHandler = (val) => {
        setPPImage(val);
    }

    return (
        <View style={styles.screen}>
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{fontSize:18, marginBottom:25}} >Enter Image URL</Text>
                        <View style={{borderBottomColor:'#ccc', borderBottomWidth:0.5, width:'80%',alignItems:'center'}}>
                            <TextInput 
                                placeholder="Enter Image URL"
                                autoCapitalize="none"
                                onChangeText={(val) => {
                                    ppChangeHandler(val)
                                }}
                            />
                        </View>
                        <View style={{width:'80%'}} >
                            <TouchableOpacity onPress={() => {
                                    console.log(ppImage)
                                    setModalVisible(!modalVisible)
                                }} >
                                <View style={styles.button}>
                                    <Text style={styles.editText}>Save</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* PROFILE PICTURE */}
            <View style={styles.ppContainer}>
                <Image source={{uri: Users.profile_picture }} style={styles.ppImage}/>
            </View>
            <View style={{height:50, width:50}}>
                <TouchableOpacity onPress={() => {setModalVisible(true)}} >
                    <View style={styles.ppEdit}>
                        <FontAwesome name="camera" color='white' size={25}/>
                    </View>
                </TouchableOpacity>
            </View>

            {/* DETAILS */}

            {/* Username */}
            <View style={styles.detailItem}>
                <Text style={styles.text_footer}>Username</Text>
                <View style={styles.action} >
                    <FontAwesome name="user" color={Colors.orange} size={20}/>
                    <View style={styles.input}>
                    <TextInput 
                            value={Users.username}
                            style={styles.input}
                        />
                    </View>
                </View>
            </View>

            {/* Email */}
            <View style={styles.detailItem}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action} >
                    <FontAwesome name="envelope" color={Colors.orange} size={20}/>
                    <View style={styles.input}>
                    <TextInput 
                            value={Users.email}
                            style={styles.input}
                        />
                    </View>
                </View>
            </View>

            {/* Phone Number */}
            <View style={styles.detailItem}>
                <Text style={styles.text_footer}>Phone Number</Text>
                <View style={styles.action} >
                    <FontAwesome name="phone" color={Colors.orange} size={20}/>
                    <View style={styles.input}>
                    <TextInput 
                            value={Users.phone_number}
                            style={styles.input}
                        />
                    </View>
                </View>
            </View>

            {/* Postcode */}
            <View style={styles.detailItem}>
                <Text style={styles.text_footer}>Home Postcode</Text>
                <View style={styles.action} >
                    <FontAwesome name="home" color={Colors.orange} size={20}/>
                    <View style={styles.input}>
                        <TextInput 
                            value={Users.post_code}
                            style={styles.input}
                        />
                    </View>
                </View>
            </View>

            {/* Save Button */}
            <View style={{width:'100%', justifyContent:'center'}}>
                <TouchableOpacity onPress={() => {
                    props.navigation.goBack()
                }} >
                    <View style={styles.button}>
                        <Text style={styles.editText}>Save</Text>
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
        width:180,
        zIndex:5
    },
    text_footer:{
        color:Colors.grey,
        fontSize:15,
        fontWeight:'bold',
        marginVertical:5
    },
    input:{
        marginLeft: 15,
        fontSize: 15
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width:'80%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    ppEdit:{
        backgroundColor: Colors.orange,
        height:50,
        width:50,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        zIndex:10,
        left: 75,
        bottom: 30
    }
});

export default EditDetailScreen;