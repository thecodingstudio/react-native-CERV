import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import * as Animatable from 'react-native-animatable';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../constants/Colors';

const NumberVerificationScreen = props => {

    const dummy_codes = ["+44","+78","+91","+53"]

    return (
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
                <Text style={styles.text_header} >Phone Number</Text>
                <Text style={styles.headerText}>Verify your phone number</Text>
                <Text style={styles.headerText}>for extra security</Text>

            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Text style={styles.footerText}>we'll send you a verification code.</Text>
                <Text style={styles.footerText}>Just enter your phone number below</Text>
                
                <Text style={styles.text_footer} >Phone Number</Text>
                <View style={styles.action} >
                    <Ionicon name="call-outline" color={Colors.orange} size={20}/>
                    <SelectDropdown 
                        data={ dummy_codes } 
                        onSelect={() => {}} 
                        buttonTextAfterSelection={(selectedItem, index) => { return selectedItem }} 
                        rowTextForSelection={(item, index) => {return item}} 
                        buttonStyle={{
                            backgroundColor:'white', 
                            width:'25%', 
                            height:25, 
                            borderRightColor: Colors.grey, 
                            borderRightWidth:1
                        }} 
                        defaultButtonText='   ▼'/>
                    <TextInput 
                        placeholder='Your Phone Number' 
                        style={styles.textInput}
                        autoCapitalize="none"
                        keyboardType='phone-pad'
                        onChangeText={() => {}}
                        maxLength={10}
                        />
                </View>

                {/* LOGIN */}
                <TouchableOpacity onPress={() => {
                    
                    props.navigation.navigate('VerifyScreen');
                }} >
                    <View style={styles.button}>
                        <View style={styles.signIn}>
                            <Text style={[styles.textSign,{color:'#fff'}]} >Send Code</Text>
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
        fontWeight:'bold',
        marginTop:50
    },
    action:{
        flexDirection:'row',
        marginTop:15,
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
        color: Colors.grey
    },
    list:{
        borderRightColor: Colors.grey,
        borderRightWidth: 1,
        width:'15%',
        height:35
    }
});

export default NumberVerificationScreen;