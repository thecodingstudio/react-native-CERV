import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, Alert, ActivityIndicator } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { CommonActions } from '@react-navigation/native';

import{ Colors, Images }from '../../CommonConfig';
import { postFormDataRequest, postPreLogin } from '../../helpers/ApiHelpers';
import { useSelector } from 'react-redux';

const VerifyScreen = ({navigation, route}) => {

    const [ loading, setLoading ] = useState(false)

    // Random Name generator
    const makeid = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
       return result;
    }

    // const user = useSelector(state => state.Register)
    // const userFormData = new FormData();
    // userFormData.append("name",user.name)
    // userFormData.append("email",user.email)
    // userFormData.append("password", user.password)
    // userFormData.append("role", user.role)
    
    // userFormData.append("image", { uri: user.image.path, type: user.image.mime, name: makeid(10) })
    // console.log(userFormData)

    const countryCode = route.params.countryCode;
    const phoneNumber = route.params.phoneNumber;
    const data = route.params.params
    // console.log(data)

    const [ otpValue, setOTPValue ] = useState('');

    const pressHandler = async(otpValue) => {
        // navigation.navigate('StoreRegister')
        setLoading(true)
        const verifyOTP = {
            otpValue: otpValue,
            country_code: countryCode,
            phone_number: phoneNumber
        }
        const response = await postPreLogin('/users/verifyOTP', verifyOTP);
        const resData = response.data;
        let errorMsg = 'Something went wrong!';
        if (response.success) {
            const user = new FormData();
            user.append('image',{ uri: data.selectedImage.path, type: data.selectedImage.mime, name: makeid(10) })
            user.append('email', data.email)
            user.append('password', data.password)
            user.append('role', data.role)
            user.append("country_code", countryCode)
            user.append("phone_number", phoneNumber)
            user.append('name', data.username.trim())
            //image, email, password, role, phone & cc , username

            const res = await fetch('https://cerv-api.herokuapp.com/users/register',{
                method: 'POST',
                headers:{
                    "Content-Type" : "multipart/form-data"
                },
                body: user
            })

            const registerResponse = await res.json()
            // console.log(registerResponse)
            if( registerResponse.status === 1 ) {
                //SUCCESS
                const loginData = {
                    email: data.email,
                    password: data.password,
                    role: data.role,
                    device_token: JSON.stringify(AsyncStorage.getItem('deviceToken'))
                }
                
                const response = await postPreLogin('/users/login', loginData)
                const resData = response.data
                if( response.success ) {
                    try {
                        await AsyncStorage.setItem('role',resData.user.role.toString())
                        await AsyncStorage.setItem('token', resData.token)
                        await AsyncStorage.setItem('refreshToken', resData.refreshToken)
                        await AsyncStorage.setItem('userInfo', JSON.stringify(resData.user))
                        await AsyncStorage.setItem('isLogin', "1")
                    } catch (error) {
                        console.log(error)
                    }
                    if(resData.user.role === 0) {
                        navigation.dispatch(
                            CommonActions.reset({
                                index:0,
                                routes: [{name: 'CatererHome'}]
                            })
                        )
                        setLoading(false)
                    } else {
                        navigation.dispatch(
                            CommonActions.reset({
                                index:0,
                                routes: [{name: 'Home'}]
                            })
                        )
                        setLoading(false)
                    }
                } else {
                    if (resData.error === 'User does not exist!') {
                        Toast.show(" User does not exist! ");
                        setLoading(false)
                    } else if (resData.error === 'Invalid Password!') {
                        Toast.show("Incorrect Password")
                        setLoading(false)
                    }
                }

            } else {
                console.log(registerResponse)
                setLoading(false)
            }
        } else {
            if( resData.error ==="Invalid OTP entered!"){
                errorMsg = "Invalid OTP entered!"
            }
            Alert.alert("Error",errorMsg,[{text:"Okay"}])
            setLoading(false)
        }
    }

    if(loading) {
        return(
            <View style={styles.loader}>
                <ActivityIndicator size={65} color={Colors.ORANGE}/>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={Colors.ORANGE} barStyle='light-content' />
            {/* HEADER */}
            <View style={styles.header}>
                <View style={{flex:0.9}}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{marginVertical:10, marginLeft:10}}>
                            <Ionicon name="arrow-back-outline" size={35} color={Colors.WHITE}/>
                    </TouchableOpacity>
                    <Text style={styles.headerLabel} numberOfLines={1}>Verification Code</Text>
                    <Text style={styles.headerText}>We have sent an SMS to {countryCode}-{phoneNumber}. Please enter the code you receive below.</Text>
                </View>
                <Image source={ Images.AUTH_HEADER2 } style={styles.image}/>
            </View>

            {/* BODY */}
            <View style={{backgroundColor: Colors.ORANGE, flex:3}}>
                <View style={styles.body}>
                    <View style={{flex:1}}>
                        <View style={{flex:0.5}}>
                            <OTPInputView 
                                pinCount={4}
                                autoFocusOnLoad
                                codeInputHighlightStyle ={styles.OtpInputCell}
                                codeInputFieldStyle = {styles.OtpInputCellUnfocused}
                                placeholderCharacter="-"
                                onCodeFilled = {(code) => {setOTPValue(code)}}
                            />
                        </View>

                        {/* Resend Code */}
                        <View style={{flex:0.5, flexDirection:'row', justifyContent:'center'}}>
                            <Text style={styles.resend_code}>Didn't Get the Code? </Text>
                            <TouchableOpacity onPress={() => {navigation.navigate('NumberVerificationScreen')}} >
                                <Text style={styles.resend}>Resend Code</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flex:0.5}}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.verifyNow} onPress={() => pressHandler(otpValue)}>
                            <Text style={styles.verifyNowText}>Verify Now</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loader:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    screen:{
        flex:1,
        backgroundColor:Colors.WHITE
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
    },
    verifyNow:{
        alignItems:'center', 
        justifyContent:'center', 
        padding:20, 
        backgroundColor: Colors.ORANGE, 
        borderRadius:5
    },
    verifyNowText:{
        color: Colors.WHITE, 
        fontWeight:'bold', 
        fontSize:20
    },
    OtpInputCell:{
        backgroundColor: Colors.ORANGE,
        borderRadius:5,
        borderWidth:0,
        height:60,
        width:60
    },
    OtpInputCellUnfocused:{
        backgroundColor: Colors.ORANGE,
        borderRadius:5,
        borderWidth:0,
        height:60,
        width:60
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
        paddingHorizontal:10
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
        paddingHorizontal:35,
        paddingTop:30,
        justifyContent:'space-between'
    },
    image:{
        marginVertical:10,
        height: 180,
        width:180,
        marginRight:10
    },
});

export default VerifyScreen;

// <>
        // <SafeAreaView style={{flex:0,backgroundColor:Colors.ORANGE}}/>
        // <SafeAreaView style={{flex:1,backgroundColor:Colors.WHITE}}>
        // <KeyboardAwareScrollView>
        // <View style={styles.container} >
        //     <StatusBar backgroundColor='#009387' barStyle='light-content'/>
        //     <View style={styles.header} >
        //         <TouchableOpacity onPress={() => navigation.goBack()} >
        //             <View style={{marginVertical:10}} >
        //                 <Ionicon name="arrow-back-outline" size={35} color={Colors.WHITE}/>
        //             </View>
        //         </TouchableOpacity>
        //         <Text style={styles.text_header} >Verification Code</Text>
        //         <Text style={styles.headerText}>We have sent an SMS to</Text>
        //         <Text style={styles.headerText}>+91-972*****89. Please enter the</Text>
        //         <Text style={styles.headerText}>code you receive below.</Text>

        //     </View>
        //     <Animatable.View style={styles.footer} animation="fadeInUpBig">
                
        //         {/* OTP Entering */}
        //         <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
        //             <TextInput 
        //                 autoFocus={true}
        //                 ref={pin1ref}
        //                 style={styles.cell}
        //                 maxLength={1}
        //                 keyboardType='numeric'
        //                 placeholder="-"
        //                 placeholderTextColor={Colors.WHITE}
        //                 onKeyPress={({nativeEvent}) => {
        //                     nativeEvent.key === 'Backspace' ? null : pin2ref.current.focus();
        //                 }}
        //             />
        //             <TextInput 
        //                 ref={pin2ref}
        //                 style={styles.cell}
        //                 maxLength={1}
        //                 keyboardType='numeric'
        //                 placeholder="-"
        //                 placeholderTextColor={Colors.WHITE}
        //                 onKeyPress={({nativeEvent}) => {
        //                     nativeEvent.key === 'Backspace' ? pin1ref.current.focus() : pin3ref.current.focus();
        //                 }}
        //             />
        //             <TextInput 
        //                 ref={pin3ref}
        //                 style={styles.cell}
        //                 maxLength={1}
        //                 keyboardType='numeric'
        //                 placeholder="-"
        //                 placeholderTextColor={Colors.WHITE}
        //                 onKeyPress={({nativeEvent}) => {
        //                     nativeEvent.key === 'Backspace' ? pin2ref.current.focus() : pin4ref.current.focus();
        //                 }}
        //             />
        //             <TextInput 
        //                 ref={pin4ref}
        //                 style={styles.cell}
        //                 maxLength={1}
        //                 keyboardType='numeric'
        //                 placeholder="-"
        //                 placeholderTextColor={Colors.WHITE}
        //                 onKeyPress={({nativeEvent}) => {
        //                     nativeEvent.key === 'Backspace' ? pin3ref.current.focus() : pin4ref.current.blur();
        //                 }}
        //             />
        //         </View>
                
                

        //         {/* LOGIN */}
        //     </Animatable.View>
        // </View>
        // </KeyboardAwareScrollView>
        // </SafeAreaView>
        // </>

        // container:{
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
        // text_footer:{
        //     color:'#05375a',
        //     fontSize:18,
        //     fontWeight:'bold',
        //     marginTop:50
        // },
        // action:{
        //     flexDirection:'row',
        //     marginTop:15,
        //     borderBottomWidth:1,
        //     borderBottomColor:Colors.GREY,
        //     paddingBottom: 10
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
        // },
        // cell:{
        //     borderRadius:10,
        //     textAlign:'center',
        //     backgroundColor: Colors.ORANGE,
        //     width:'15%',
        //     height:55,
        //     color:Colors.WHITE,
        //     fontWeight:'bold',
        //     fontSize:30
        // },
        