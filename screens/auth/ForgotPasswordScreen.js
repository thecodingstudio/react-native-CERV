import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, SafeAreaView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../constants/Colors';

const ForgotPasswordScreen = props => {

    return(
        <>
        <SafeAreaView style={{flex:0,backgroundColor:Colors.orange}}/>
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
        <KeyboardAwareScrollView>
        <View style={styles.container} >
            <StatusBar backgroundColor='#009387' barStyle='light-content'/>
            <View style={styles.header} >
                <TouchableOpacity onPress={() => props.navigation.goBack()} >
                    <View style={{marginVertical:10}} >
                        <Ionicon name="arrow-back-outline" size={35} color="white"/>
                    </View>
                </TouchableOpacity>
                <Text style={styles.text_header} >Forgot Password</Text>
                <Text style={styles.headerText}>Reset your password</Text>
                <Text style={styles.headerText}>immediately</Text>
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Text style={styles.footerText}>Please enter the email address below, you</Text>
                <Text style={styles.footerText}>will receive a link to create a new password</Text>
                <Text style={styles.footerText}>via email.</Text>

                <Text style={styles.text_footer} >Email</Text>
                <View style={styles.action} >
                    <FontAwesome name="envelope" color={Colors.orange} size={20}/>
                    <TextInput 
                        value={forgotPasswordEmail}
                        placeholder='Your E-mail' 
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={() => {}}
                        />
                </View>
                
                {/* LOGIN */}
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('SignInScreen')
                }}>
                    <View style={styles.button}>
                        <View style={styles.signIn}>
                            <Text style={[styles.textSign,{color:'#fff'}]} >Send Now</Text>
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
        fontSize:30,
        marginBottom: 20
    },
    text_footer:{
        color:'#05375a',
        fontSize:18,
        fontWeight:'bold',
        marginTop:35
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
        marginTop: 50,
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
        marginBottom:5,
        color: Colors.grey
    },
    signUp:{
        fontSize:18,
        color:'#131211'
    },
    register:{
        fontWeight:'bold'
    }
});

export default ForgotPasswordScreen;