import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Image, Dimensions, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';

import Colors from '../../constants/Colors';

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

    let openImagePickerAsync = async() => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
          }
      
            let pickerResult = await ImagePicker.launchImageLibraryAsync();
            
            if (pickerResult.cancelled === true) {
                return;
              }
              
              console.log(pickerResult)

              setSelectedImage({ localUri: pickerResult.uri });
        }

    return(
        <>
        <SafeAreaView style={{flex:0,backgroundColor:Colors.orange}}/>
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
        <KeyboardAwareScrollView>
        <View style={styles.container} >
            <StatusBar backgroundColor='#009387' barStyle='light-content'/>
            <View style={styles.header} >
                <TouchableOpacity onPress={() => props.navigation.goBack()} >
                    <View style={{marginTop:10, marginBottom:50}} >
                        <Ionicon name="arrow-back-outline" size={35} color="white"/>
                    </View>
                </TouchableOpacity>
                <Text style={styles.text_header} >Let's Start!</Text>
                <Text style={styles.headerText}>Tell us more about you</Text>
            </View>
            
            <Animatable.View style={styles.footer} animation="fadeInUpBig">

                {/* PROFILE PICTURE */}
                <View style={styles.ppContainer}>
                    <View style={styles.profile_picture}>
                        {selectedImage ? <Image source={{ uri: selectedImage.localUri }} style={{height:100,width:100}}/> :  <Image source={require('../../assets/Icons/icons8-person-100.png')} style={{height:100,width:100}} />}
                    </View>

                    {selectedImage ? null : <View style={styles.add_icon}>
                        <TouchableOpacity onPress={openImagePickerAsync} >
                            <Ionicon name="add-outline" color={Colors.orange} size={30}/>
                        </TouchableOpacity>
                    </View>}
                </View>

                <KeyboardAvoidingView keyboardVerticalOffset={ useHeaderHeight() } style = {{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null} enabled>

                <Text style={styles.text_footer} >User Name</Text>
                <View style={styles.action} >
                    <FontAwesome name="user" color={Colors.orange} size={20}/>
                    <TextInput 
                        placeholder='Your Username' 
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={() => {}}
                        />
                   <Animatable.View animation="bounceIn" ><Feather name="check-circle" color="green" size={20}/></Animatable.View>
                </View>

                <Text style={[styles.text_footer,{marginTop:20}]} >Email</Text>
                <View style={styles.action} >
                    <FontAwesome name="envelope" color={Colors.orange} size={20}/>
                    <TextInput 
                        placeholder='Your E-mail' 
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={() => {}}
                        />
                    <Animatable.View animation="bounceIn" ><Feather name="check-circle" color="green" size={20}/></Animatable.View>
                </View>
                
                <Text style={[styles.text_footer,{marginTop:20}]} >Password</Text>
                <View style={styles.action} >
                    <FontAwesome name="lock" color={Colors.orange} size={20}/>
                    <TextInput 
                        placeholder='Your Password'
                        secureTextEntry={pTouched ? false : true}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={() => {}}
                        />
                    <TouchableOpacity onPress={passwordViewHandler}>
                        {!pTouched ? <Feather name="eye-off" color="grey" size={20}/> : <Feather name="eye" color="grey" size={20}/>}
                    </TouchableOpacity>
                </View>

                <Text style={[styles.text_footer,{marginTop:20}]} >Confirm Password</Text>
                <View  style={styles.action} >
                    <FontAwesome name="lock" color={Colors.orange} size={20}/>
                    <TextInput 
                        placeholder='Confirm Your Password'
                        secureTextEntry={cpTouched ? false : true}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={() => {}}
                        />
                    <TouchableOpacity onPress={ confirmPasswordViewHandler }>
                        {!cpTouched ? <Feather name="eye-off" color="grey" size={20}/> : <Feather name="eye" color="grey" size={20}/>}
                    </TouchableOpacity>
                </View>

                </KeyboardAvoidingView>

                <View style={{flexDirection:'row', marginTop:10}} >
                    <TouchableOpacity onPress={tncHandler} >
                        { tnc ? <Ionicon name="checkbox-outline" color="green" size={20}/> : <Ionicon name="square-outline" color={Colors.grey} size={20}/>}
                    </TouchableOpacity>
                    <Text style={styles.tandc} >I Agree to the <Text style={styles.sp_tandc} >Terms {'&'} Conditions</Text> and <Text style={styles.sp_tandc}>Privacy Policy</Text></Text>
                </View>


                {/* LOGIN */}
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('NumberVerificationScreen');                   
                }}>
                <View style={styles.button}>
                    <View style={styles.signIn}>
                        <Text style={[styles.textSign,{color:'#fff'}]} >Next</Text>
                    </View>
                </View>
                </TouchableOpacity>
                
            </Animatable.View>
        </View>
        </KeyboardAwareScrollView>
        </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.orange,
    },
    header:{
        flex:1,
        justifyContent:'flex-end',
        paddingBottom:50,
        paddingHorizontal:20
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
        borderBottomColor:Colors.grey,
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
    signIn:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor: Colors.orange
    },
    textSign:{
        fontSize:18,
        fontWeight:'bold'
    },
    headerText:{
        color:'white',
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
        color: Colors.grey
    },
    signUp:{
        fontSize:18,
        color:'#131211'
    },
    register:{
        fontWeight:'bold'
    },
    tandc:{
        color: 'black',
        fontSize: 15,
        marginLeft:10
    },
    sp_tandc:{
        fontWeight:'bold',
        color: Colors.orange,
    },
    ppContainer:{
        alignItems:'center',
        marginBottom:20
    },
    profile_picture:{
        borderRadius:50,
        borderColor:Colors.grey,
        borderWidth:1,
        overflow:'hidden'
    },
    add_icon:{
        borderTopRightRadius:15,
        borderBottomRightRadius:15,
        borderTopLeftRadius:15,
        borderBottomLeftRadius:15,
        backgroundColor:'white',
        shadowColor:'#171717',
        shadowOffset:{width:-2,height:4},
        shadowOpacity:0.2,
        shadowRadius:3,
        elevation:20,
        position:'absolute',
        bottom:Dimensions.get('window').height * 0.002,
        right: Dimensions.get('window').width * 0.315
    }
});

export default SignUpScreen;