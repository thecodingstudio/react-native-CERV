import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import{ Colors }from '../../commonconfig';

const VerifyScreen = props => {
    
    const pin1ref = useRef(null);
    const pin2ref = useRef(null);
    const pin3ref = useRef(null);
    const pin4ref = useRef(null);

    return (
        <>
        <SafeAreaView style={{flex:0,backgroundColor:Colors.ORANGE}}/>
        <SafeAreaView style={{flex:1,backgroundColor:Colors.WHITE}}>
        <KeyboardAwareScrollView>
        <View style={styles.container} >
            <StatusBar backgroundColor='#009387' barStyle='light-content'/>
            <View style={styles.header} >
                <TouchableOpacity onPress={() => props.navigation.goBack()} >
                    <View style={{marginVertical:10}} >
                        <Ionicon name="arrow-back-outline" size={35} color={Colors.WHITE}/>
                    </View>
                </TouchableOpacity>
                <Text style={styles.text_header} >Verification Code</Text>
                <Text style={styles.headerText}>We have sent an SMS to</Text>
                <Text style={styles.headerText}>+91-972*****89. Please enter the</Text>
                <Text style={styles.headerText}>code you receive below.</Text>

            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                
                {/* OTP Entering */}
                <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                    <TextInput 
                        autoFocus={true}
                        ref={pin1ref}
                        style={styles.cell}
                        maxLength={1}
                        keyboardType='numeric'
                        placeholder="-"
                        placeholderTextColor={Colors.WHITE}
                        onKeyPress={({nativeEvent}) => {
                            nativeEvent.key === 'Backspace' ? null : pin2ref.current.focus();
                        }}
                    />
                    <TextInput 
                        ref={pin2ref}
                        style={styles.cell}
                        maxLength={1}
                        keyboardType='numeric'
                        placeholder="-"
                        placeholderTextColor={Colors.WHITE}
                        onKeyPress={({nativeEvent}) => {
                            nativeEvent.key === 'Backspace' ? pin1ref.current.focus() : pin3ref.current.focus();
                        }}
                    />
                    <TextInput 
                        ref={pin3ref}
                        style={styles.cell}
                        maxLength={1}
                        keyboardType='numeric'
                        placeholder="-"
                        placeholderTextColor={Colors.WHITE}
                        onKeyPress={({nativeEvent}) => {
                            nativeEvent.key === 'Backspace' ? pin2ref.current.focus() : pin4ref.current.focus();
                        }}
                    />
                    <TextInput 
                        ref={pin4ref}
                        style={styles.cell}
                        maxLength={1}
                        keyboardType='numeric'
                        placeholder="-"
                        placeholderTextColor={Colors.WHITE}
                        onKeyPress={({nativeEvent}) => {
                            nativeEvent.key === 'Backspace' ? pin3ref.current.focus() : pin4ref.current.blur();
                        }}
                    />
                </View>
                
                {/* Resend Code */}
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginVertical:30}} >
                <Text style={styles.resend_code}>Didn't Get the Code? </Text>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('NumberVerificationScreen')
                }} >
                    <Text style={styles.resend} >Resend Code</Text>
                </TouchableOpacity>
                </View>

                {/* LOGIN */}
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('SignInScreen');
                }} >
                    <View style={styles.button}>
                        <View style={styles.signIn}>
                            <Text style={[styles.textSign,{color:'#fff'}]}>Verify Now</Text>
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
        backgroundColor: Colors.ORANGE,
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
        fontWeight:'bold',
        marginTop:50
    },
    action:{
        flexDirection:'row',
        marginTop:15,
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
        marginTop: 50,
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
        color: Colors.GREY
    },
    list:{
        borderRightColor: Colors.GREY,
        borderRightWidth: 1,
        width:'15%',
        height:35
    },
    cell:{
        borderRadius:10,
        textAlign:'center',
        backgroundColor: Colors.ORANGE,
        width:'15%',
        height:55,
        color:Colors.WHITE,
        fontWeight:'bold',
        fontSize:30
    },
    resend:{
        color:Colors.ORANGE,
        fontWeight:'bold',
        fontSize: 18
    },
    resend_code:{
        fontWeight:'bold',
        color:Colors.GREY,
        fontSize:18
    }
});

export default VerifyScreen;