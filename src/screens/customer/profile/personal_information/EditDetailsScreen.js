import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from 'react-native-image-crop-picker';

import Colors from '../../../../CommonConfig/Colors';
import Users from "../../../../model/users";

const EditDetailScreen = props => {

    const [ selectedImage, setSelectedImage ] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const takeFromCamera = () => {
        ImagePicker.openCamera({
            width: 100,
            height: 100,
            cropping: true,
          }).then(image => {
            setSelectedImage(image.path)
            setModalVisible(!modalVisible)
          });
    }

    const pickFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            setSelectedImage(image.path)
            setModalVisible(!modalVisible)
          });
    }
    

    return (
        <KeyboardAwareScrollView>
        <View style={styles.screen}>
            
            {/* PROFILE PICTURE */}
            <View style={styles.ppContainer}>
                {selectedImage ? <Image source={{ uri: selectedImage}} style={{height:180,width:180}}/> : <Image source={{uri: Users.profile_picture}} style={styles.ppImage}/>}
            </View>
            <View style={{height:50,alignItems:'center'}}>
                <TouchableOpacity  onPress={() => {setModalVisible(true)}} style={styles.ppEdit}>
                    <FontAwesome name="camera" color='white' size={25}/>
                </TouchableOpacity>
            </View>
            <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Choose option: </Text>
                                <TouchableOpacity style={[styles.buttonModal, styles.buttonClose]} onPress={pickFromGallery}>   
                                    <Text style={styles.textStyle}>Choose from gallery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.buttonModal, styles.buttonClose]} onPress={takeFromCamera}>
                                    <Text style={styles.textStyle}>Use Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.buttonModal, styles.buttonClose]} onPress={() => {setModalVisible(false)}}>
                                    <Text style={styles.textStyle}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

            {/* DETAILS */}

            {/* Username */}
            <View style={styles.detailItem}>
                <Text style={styles.text_footer}>Username</Text>
                <View style={styles.action} >
                    <FontAwesome name="user" color={Colors.ORANGE} size={20}/>
                    <View style={styles.input}>
                    <TextInput 
                            placeholder={Users.username}
                            style={styles.input}
                        />
                    </View>
                </View>
            </View>

            {/* Email */}
            <View style={styles.detailItem}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action} >
                    <FontAwesome name="envelope" color={Colors.ORANGE} size={20}/>
                    <View style={styles.input}>
                    <TextInput 
                            keyboardType="email-address"
                            placeholder={Users.email}
                            style={styles.input}
                        />
                    </View>
                </View>
            </View>

            {/* Phone Number */}
            <View style={styles.detailItem}>
                <Text style={styles.text_footer}>Phone Number</Text>
                <View style={styles.action} >
                    <FontAwesome name="phone" color={Colors.ORANGE} size={20}/>
                    <View style={styles.input}>
                    <TextInput 
                            keyboardType="phone-pad"
                            placeholder={Users.phone_number}
                            style={styles.input}
                        />
                    </View>
                </View>
            </View>

            {/* Postcode */}
            <View style={styles.detailItem}>
                <Text style={styles.text_footer}>Home Postcode</Text>
                <View style={styles.action} >
                    <FontAwesome name="home" color={Colors.ORANGE} size={20}/>
                    <View style={styles.input}>
                        <TextInput 
                            keyboardType="numeric"
                            placeholder={Users.post_code}
                            style={styles.input}
                        />
                    </View>
                </View>
            </View>

            

            {/* Save Button */}
            <View style={{width:'100%', justifyContent:'center', marginTop:25}}>
                <TouchableOpacity onPress={() => {
                    props.navigation.goBack()
                }} >
                    <View style={styles.button}>
                        <Text style={styles.editText}>Save</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        </KeyboardAwareScrollView>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        backgroundColor:Colors.WHITE
    },
    detailItem:{
        width:'85%',
        marginTop: 10
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
        color:Colors.GREY,
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
        borderBottomColor:Colors.GREY,
        paddingBottom: 10
    },
    value:{
        fontSize:17,
        fontWeight:'700'
    },
    button:{
        backgroundColor:Colors.ORANGE,
        width:'90%',
        height:50,
        justifyContent:'center',
        borderRadius:10,
        marginTop: 5,
        marginHorizontal:'5%'
    },
    editText:{
        textAlign:'center',
        color:Colors.WHITE,
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
        backgroundColor: Colors.WHITE,
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
        backgroundColor: Colors.ORANGE,
        flexDirection:'row',
        height:50,
        width:50,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        bottom:75,
        left:35
    },
    changePP:{
        textAlign:'center',
        color:Colors.WHITE,
        fontSize:15,
        fontWeight:'700',
        marginHorizontal:5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: Colors.WHITE,
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
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical:5,
        width:200
    },
    buttonClose: {
        backgroundColor: Colors.ORANGE,
    },
    textStyle: {
        color: Colors.WHITE,
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight:'bold',
        fontSize:20
    }
});

export default EditDetailScreen;