import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, SafeAreaView, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-number-input';

import Colors from '../../CommonConfig/Colors';

const NumberVerificationScreen = props => {

    const [ phoneNumber, setPhoneNumber ] = useState('');

    return (
        <View style={styles.screen}>
            <KeyboardAwareScrollView>
                <StatusBar backgroundColor={Colors.ORANGE} barStyle='light-content' />

                {/* HEADER */}
                <View style={styles.header}>
                    <View style={{flex:0.8}}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{marginVertical:10, marginLeft:10}}>
                                <Ionicon name="arrow-back-outline" size={35} color={Colors.WHITE}/>
                        </TouchableOpacity>
                        <Text style={styles.headerLabel}>Phone Number</Text>
                        <Text style={styles.headerText}>Verify your phone number for extra security</Text>
                    </View>
                    <Image source={ require('../../assets/Icons/chef.png')} style={styles.image}/>
                </View>


                {/* BODY */}
                <View style={{backgroundColor: Colors.ORANGE}}>
                    <View style={styles.body}>

                        <Text style={styles.footerText}>Please enter the email address below, you will receive a link to create a new password via email.</Text>                        
                        <Text style={styles.text_footer} >Phone Number</Text>
                        <View style={styles.action} >
                            <Ionicon name="call-outline" color={Colors.ORANGE} size={20}/>
                            
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:Colors.WHITE
    },
    phoneContainer:{
        backgroundColor:Colors.WHITE
    },
    textInput:{
        backgroundColor:Colors.WHITE
    },
    header:{
        flex:1,
        backgroundColor: Colors.ORANGE,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    headerLabel:{
        color:Colors.WHITE,
        fontWeight:'bold',
        fontSize:26,
        margin:10
    },
    headerText:{
        color:Colors.WHITE,
        fontWeight:'600',
        fontSize:15,
        width:'100%',
        marginLeft:10
    },
    body:{
        flex:3,
        backgroundColor:Colors.WHITE,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30
    },
    image:{
        marginVertical:10,
        marginRight:5,
        height: 180,
        width:180
    },
    footerText:{
        fontSize:18,
        marginTop:5,
        marginBottom:5,
        color: Colors.GREY
    },
    action:{
        flexDirection:'row',
        marginTop:15,
        borderBottomWidth:1,
        borderBottomColor:Colors.GREY,
        paddingBottom: 10,
        alignItems:'center',
    },
    text_footer:{
        color:'#05375a',
        fontSize:18,
        fontWeight:'bold',
        marginTop:50
    },
});

export default NumberVerificationScreen;

//<>
        // <SafeAreaView style={{flex:0,backgroundColor:Colors.ORANGE}}/>
        // <SafeAreaView style={{flex:1,backgroundColor:{Colors.WHITE}}}>
        // <KeyboardAwareScrollView>
        // <View style={styles.container} >
        //     <StatusBar backgroundColor={Colors.ORANGE} barStyle='light-content'/>
        //     <View style={styles.header} >
        //         <TouchableOpacity onPress={() => props.navigation.goBack()} >
        //             <View style={{marginVertical:10}} >
        //                 <Ionicon name="arrow-back-outline" size={35} color={Colors.WHITE}/>
        //             </View>
        //         </TouchableOpacity>
        //         <Text style={styles.text_header} >Phone Number</Text>
        //         <Text style={styles.headerText}>Verify your phone number</Text>
        //         <Text style={styles.headerText}>for extra security</Text>

        //     </View>
        //     <Animatable.View style={styles.footer} animation="fadeInUpBig">
        //         <Text style={styles.footerText}>we'll send you a verification code.</Text>
        //         <Text style={styles.footerText}>Just enter your phone number below</Text>
                
        
        //             <Ionicon name="call-outline" color={Colors.ORANGE} size={20}/>
        //             <SelectDropdown 
        //                 data={ dummy_codes } 
        //                 onSelect={() => {}} 
        //                 buttonTextAfterSelection={(selectedItem, index) => { return selectedItem }} 
        //                 rowTextForSelection={(item, index) => {return item}} 
        //                 buttonStyle={{
        //                     backgroundColor:Colors.WHITE, 
        //                     width:'25%', 
        //                     height:25, 
        //                     borderRightColor: Colors.GREY, 
        //                     borderRightWidth:1
        //                 }} 
        //                 defaultButtonText='   ▼'/>
        //             <TextInput 
        //                 placeholder='Your Phone Number' 
        //                 style={styles.textInput}
        //                 autoCapitalize="none"
        //                 keyboardType='phone-pad'
        //                 onChangeText={() => {}}
        //                 maxLength={10}
        //                 />
        //         </View>

        //         {/* LOGIN */}
        //         <TouchableOpacity onPress={() => {
                    
        //             props.navigation.navigate('VerifyScreen');
        //         }} >
        //             <View style={styles.button}>
        //                 <View style={styles.signIn}>
        //                     <Text style={[styles.textSign,{color:'#fff'}]} >Send Code</Text>
        //                 </View>
        //             </View>
        //         </TouchableOpacity>

        //     </Animatable.View>
        // </View>
        // </KeyboardAwareScrollView>
        // </SafeAreaView>
        // </>


        //container:{
            //     flex:1,
            //     backgroundColor: Colors.ORANGE,
            // },
            // header:{
            //     flex:1,
            //     justifyContent:'flex-end',
            //     paddingBottom:50,
            //     paddingHorizontal:20
            // },
            // footer:{
            //     flex:3,
            //     backgroundColor:'#fff',
            //     borderTopLeftRadius:30,
            //     borderTopRightRadius:30,
            //     paddingHorizontal:20,
            //     paddingVertical:30
            // },
            // text_header:{
            //     color:'#fff',
            //     fontWeight:'bold',
            //     fontSize:30
            // },
            
            
            // textInput:{
            //    flex:1,
            //    paddingLeft:10,
            //    color:'#05375a',
            //    marginLeft:5
            // },
            // button:{
            //     alignItems:'center',
            //     marginTop: 50,
            // },
            // signIn:{
            //     width:'100%',
            //     height:50,
            //     justifyContent:'center',
            //     alignItems:'center',
            //     borderRadius:10,
            //     backgroundColor: Colors.ORANGE
            // },
            // textSign:{
            //     fontSize:18,
            //     fontWeight:'bold'
            // },
            // headerText:{
            //     color:Colors.WHITE,
            //     fontSize:15
            // },
            // forgotPassword:{
            //     textAlign:'right',
            //     marginTop: 15,
            //     fontSize:15
            // },
            // footerTitle:{
            //     fontWeight:'bold',
            //     fontSize:30,
            //     marginTop:10
            // },
            // footerText:{
            //     fontSize:18,
            //     marginTop:5,
            //     color: Colors.GREY
            // },
            // list:{
            //     borderRightColor: Colors.GREY,
            //     borderRightWidth: 1,
            //     width:'15%',
            //     height:35
            // }