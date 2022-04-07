import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Modal, StatusBar, Image,Alert, Dimensions, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';

import{ Colors, Images }from '../../commonconfig';

const SignUpScreen = props => {

    const [ selectedImage, setSelectedImage ] = useState(null)

    const [pTouched, setPTouched] = useState(false)
    const passwordViewHandler = () => {
        setPTouched(state => !state);
    }

    const [cpTouched, setCPTouched] = useState(false)
    const confirmPasswordViewHandler = () => {
        setCPTouched(state => !state);
    }

    const [tnc , setTnc] = useState(false);
    const tncHandler = () => {
        setTnc(state => !state);
    };

    const [validEmail, setValidEmail] = useState(false)
    const emailHandler = (val) => {
        var re = /\S+@\S+\.\S+/;
        setValidEmail(re.test(val));
    }

    const [validUsername, setValidUserName] = useState(false)
    const userNameHandler = (val) => {
        if(val.length >= 5){
            setValidUserName(true);
        } else {
            setValidUserName(false);
        }
    }

    const [password, setPassword] = useState('')
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const passwordHandler = (val) => {
        setPassword(val)
        if(password.length >=5) {
            setValidPassword(true);
        } else {
            setValidPassword(false);
        }
    };

    const [cPassword, setCPassword] = useState('');
    const [validCPassword, setValidCPassword] = useState(false);
    const [cPasswordTouched, setCPasswordTouched] = useState(false);
    const cPasswordHandler = (val) => {
        setCPassword(val)
    }
    const cPasswordValidator = () => {
        if(cPassword === password) {
            setValidCPassword(true)
        } else {
            setValidCPassword(false);
        }
    }

    const navigateHandler = () => {
        if(validEmail && validPassword && validCPassword && validUsername && tnc) {
            props.navigation.navigate('NumberVerificationScreen');
        } else {
            Alert.alert("Invalid Credentials","Please check the entered details before logging in.",[{text:"Okay"}]);
        }
    };

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
            width: 100,
            height: 100,
            cropping: true
          }).then(image => {
            setSelectedImage(image.path)
            setModalVisible(!modalVisible)
          });
    }

    return(
        <View>
            <StatusBar backgroundColor={Colors.ORANGE} barStyle='light-content'/>
            <KeyboardAwareScrollView>
            <View style={styles.container} >
            
            <View style={styles.header}>
                    <View style={{flex:0.8}}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{marginVertical:10}}>
                                <Ionicon name="arrow-back-outline" size={35} color={Colors.WHITE}/>
                        </TouchableOpacity>
                        <Text style={styles.headerLabel}>Let's Start</Text>
                        <Text style={styles.headerText}>Tell us more about you!</Text>
                    </View>
                    <Image source={Images.AUTH_HEADER2} style={styles.image}/>
                </View>
            
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                {/* PROFILE PICTURE */}
                <View style={styles.ppContainer}>
                    <View style={styles.profile_picture}>
                        {selectedImage ? <Image source={{ uri: selectedImage}} style={{height:100,width:100}}/> :  <Image source={Images.PROFILE_PLACEHOLDER} style={{height:100,width:100}} />}
                    </View>

                    <View style={styles.add_icon}>
                        <TouchableOpacity onPress={() => {setModalVisible(true)}} >
                            <Ionicon name="add-outline" color={Colors.ORANGE} size={30}/>
                        </TouchableOpacity>
                    </View>
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
                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose]}
                                onPress={pickFromGallery}
                            >
                            <Text style={styles.textStyle}>Choose from gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose]}
                                onPress={takeFromCamera}
                            >
                            <Text style={styles.textStyle}>Use Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose]}
                                onPress={() => {setModalVisible(false)}}
                            >
                            <Text style={styles.textStyle}>Close</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </Modal>
                </View>

                <Text style={styles.text_footer} >User Name</Text>
                <View style={styles.action} >
                    <FontAwesome name="user" color={Colors.ORANGE} size={20}/>
                    <TextInput 
                        placeholder='Your Username' 
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => {userNameHandler(val)}}
                        />
                    { validUsername ? <Animatable.View animation="bounceIn" ><Feather name="check-circle" color="green" size={20}/></Animatable.View>: null}
                </View>

                <Text style={[styles.text_footer,{marginTop:20}]} >Email</Text>
                <View style={styles.action} >
                    <FontAwesome name="envelope" color={Colors.ORANGE} size={20}/>
                    <TextInput 
                        placeholder='Your E-mail' 
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => {emailHandler(val)}}
                        />
                    {validEmail ? <Animatable.View animation="bounceIn" ><Feather name="check-circle" color="green" size={20}/></Animatable.View> : null }
                </View>
                
                <Text style={[styles.text_footer,{marginTop:20}]} >Password</Text>
                <View style={styles.action} >
                    <FontAwesome name="lock" color={Colors.ORANGE} size={20}/>
                    <TextInput 
                        placeholder='Your Password'
                        secureTextEntry={pTouched ? false : true}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => {passwordHandler(val)}}
                        onFocus = {() => {setPasswordTouched(true)}}
                        />
                    <TouchableOpacity onPress={passwordViewHandler}>
                        {!pTouched ? <Feather name="eye-off" color={Colors.GREY} size={20}/> : <Feather name="eye" color={Colors.GREY} size={20}/>}
                    </TouchableOpacity>
                </View>
                { passwordTouched ? (validPassword ? null : <Text style={styles.error}>Invalid Password</Text>) : null}

                <Text style={[styles.text_footer,{marginTop:20}]} >Confirm Password</Text>
                <View  style={styles.action} >
                    <FontAwesome name="lock" color={Colors.ORANGE} size={20}/>
                    <TextInput 
                        placeholder='Confirm Your Password'
                        secureTextEntry={cpTouched ? false : true}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => {cPasswordHandler(val)}}
                        onFocus = {() => {setCPasswordTouched(true)}}
                        onBlur = {cPasswordValidator}
                        />
                    <TouchableOpacity onPress={ confirmPasswordViewHandler }>
                        {!cpTouched ? <Feather name="eye-off" color={Colors.GREY} size={20}/> : <Feather name="eye" color={ Colors.GREY } size={20}/>}
                    </TouchableOpacity>
                </View>
                { cPasswordTouched ? (validCPassword ? null : <Text style={styles.error}>Passwords do not match.</Text>) : null}

                <View style={{flexDirection:'row', marginTop:10}} >
                    <TouchableOpacity onPress={tncHandler} >
                        { tnc ? <Ionicon name="checkbox-outline" color="green" size={20}/> : <Ionicon name="square-outline" color={Colors.GREY} size={20}/>}
                    </TouchableOpacity>
                    <Text style={styles.tandc} >I Agree to the <Text style={styles.sp_tandc} >Terms {'&'} Conditions</Text> and <Text style={styles.sp_tandc}>Privacy Policy</Text></Text>
                </View>


                {/* LOGIN */}
                <TouchableOpacity onPress={navigateHandler}>
                <View style={styles.button}>
                    <View style={styles.signIn}>
                        <Text style={[styles.textSign,{color:'#fff'}]} >Next</Text>
                    </View>
                </View>
                </TouchableOpacity> 
                
            </Animatable.View>
        </View>
        </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.ORANGE,
    },
    header:{
        flex:1,
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal:10
    },
    headerLabel:{
        color:Colors.WHITE,
        fontWeight:'bold',
        fontSize:26,
    },
    headerText:{
        color:Colors.WHITE,
        fontWeight:'600',
        fontSize:15,
        width:'100%',
        margin:10
    },
    footer:{
        flex:3,
        backgroundColor:'#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30
    },
    text_header:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:30
    },
    text_footer:{
        color:'#05375a',
        fontSize:18,
        fontWeight:'bold'
    },
    action:{
        flexDirection:'row',
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:Colors.GREY,
        paddingBottom: 10
    },
    textInput:{
       flex:1,
       paddingLeft:10,
       color:'#05375a',
       marginLeft:5
    },
    button:{
        alignItems:'center',
        marginTop: 30,
    },
    image:{
        marginVertical:10,
        marginRight:5,
        height: 180,
        width:180
    },
    signIn:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor: Colors.ORANGE
    },
    textSign:{
        fontSize:18,
        fontWeight:'bold'
    },
    headerText:{
        color:Colors.WHITE,
        fontSize:15
    },
    forgotPassword:{
        textAlign:'right',
        marginTop: 15,
        fontSize:15
    },
    footerTitle:{
        fontWeight:'bold',
        fontSize:30,
        marginTop:10
    },
    footerText:{
        fontSize:18,
        marginTop:5,
        marginBottom:40,
        color: Colors.GREY
    },
    signUp:{
        fontSize:18,
        color:'#131211'
    },
    register:{
        fontWeight:'bold'
    },
    tandc:{
        color: Colors.BLACK,
        fontSize: 15,
        marginLeft:10
    },
    sp_tandc:{
        fontWeight:'bold',
        color: Colors.ORANGE,
    },
    ppContainer:{
        alignItems:'center',
        marginBottom:20
    },
    profile_picture:{
        borderRadius:50,
        borderColor:Colors.GREY,
        borderWidth:1,
        overflow:'hidden'
    },
    add_icon:{
        borderRadius:15,
        backgroundColor:Colors.WHITE,
        shadowColor:'#171717',
        shadowOffset:{width:-2,height:4},
        shadowOpacity:0.2,
        shadowRadius:3,
        elevation:10,
        position:'absolute',
        bottom:Dimensions.get('window').height * 0.002,
        right: Dimensions.get('window').width * 0.315
    },
    error:{
        color:Colors.ERROR_RED
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
    buttonOpen: {
        backgroundColor: "#F194FF",
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

export default SignUpScreen;