import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, SafeAreaView, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';

import{ Colors, Images }from '../../commonconfig';
import SignInScreenValidationSchema from '../../schema/SignInScreenSchema';



const SignInScreen = props => {

    const [eyeTouched, setEyeTouched] = useState(false)

    return(
        <View style={styles.screen}>
            <KeyboardAwareScrollView>
                <StatusBar backgroundColor={Colors.ORANGE} barStyle='light-content' />
                {/* HEADER */}
                <View style={styles.header}>
                    <View style={{flex:0.6}}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{marginVertical:10, marginLeft:10}}>
                                <Ionicon name="arrow-back-outline" size={35} color={Colors.WHITE}/>
                        </TouchableOpacity>
                        <Text style={styles.headerLabel}>Welcome</Text>
                        <Text style={styles.headerText}>Are you a chef, do catering?</Text>
                        <Text style={styles.headerText}>Are you looking for a caterer for an event?</Text>
                        <Text style={{...styles.headerText, marginBottom:10}}>Login or Register Now.</Text>
                    </View>
                    <Image source={Images.AUTH_HEADER1} style={styles.image}/>
                </View>

                {/* BODY */}
                <View style={{backgroundColor: Colors.ORANGE}}>
                    <View style={styles.body}>
                        <Text style={styles.footerLabel}>Login</Text>
                        <Text style={styles.footerText}>Login to your account or Register below</Text>

                        <Formik
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            onSubmit = { () => { props.navigation.navigate('Home') } }
                            validationSchema = { SignInScreenValidationSchema }
                        >
                             {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                                 <View>
                                    <Text style={styles.text_footer} >Email</Text>
                                    <View style={{...styles.action, justifyContent:'space-between'}} >
                                        <View style={{flexDirection:'row'}}>
                                            <FontAwesome name="envelope" color={Colors.ORANGE} size={20}/>
                                            <TextInput
                                                value={values.email}
                                                onBlur={() => setFieldTouched('email')}
                                                onChangeText={handleChange('email')}
                                                placeholder="Email"
                                                style={styles.textInput}
                                            />
                                        </View>
                                        {touched.email && !errors.email && <Feather name="check-circle" color="green" size={20}/>}
                                    </View>
                                    {touched.email && errors.email &&
                                        <Text style={styles.errorMsg}>{errors.email}</Text>
                                    }

                                    <Text style={styles.text_footer} >Password</Text>
                                    <View style={{...styles.action, justifyContent:'space-between'}} >
                                        <View style={{flexDirection:'row'}}>
                                            <FontAwesome name="lock" color={Colors.ORANGE} size={20}/>
                                            <TextInput
                                                value={values.password}
                                                onBlur={() => setFieldTouched('password')}
                                                onChangeText={handleChange('password')}
                                                placeholder="Password"
                                                style={styles.textInput}
                                                secureTextEntry = { eyeTouched ? true : false }
                                            />
                                        </View>
                                        <TouchableOpacity onPress={ () => setEyeTouched(!eyeTouched) } > 
                                            {!eyeTouched ? <Feather name="eye-off" color={Colors.GREY} size={20}/>:<Feather name="eye" color={Colors.GREY} size={20}/>}
                                        </TouchableOpacity>
                                    </View>
                                    {touched.password && errors.password &&
                                        <Text style={styles.errorMsg}>{errors.password}</Text>
                                    }

                                    <TouchableOpacity onPress={()=>{props.navigation.navigate('ForgotPassword')}}>
                                        <Text style={styles.forgotPassword} > Forgot Password ? </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                                        <View style={styles.button}>
                                            <View style={styles.signIn}>
                                                <Text style={[styles.textSign,{color:'#fff'}]} >Login</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    <Image source={Images.OR} style={{width:'100%', height:30, marginTop:20}}/>

                                    <TouchableOpacity onPress={() => props.navigation.navigate('SignUpScreen')} style={{alignItems:'center', marginTop:25}} >
                                        <Text style={styles.signUp} >Don't have an Account? <Text style={styles.register}>Register</Text></Text>
                                    </TouchableOpacity>

                                 </View>
                             )}
                        </Formik>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor: Colors.WHITE
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
        fontSize:30,
        margin:10
    },
    headerText:{
        color:Colors.WHITE,
        fontWeight:'900',
        fontSize:15,
        marginLeft:10,
    },
    body:{
        flex:3,
        backgroundColor:Colors.WHITE,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30,
    },
    image:{
        marginVertical:10,
        height: 180,
        width:180,
        flex:0.45,
        marginRight:10
    },
    footerLabel:{
        fontWeight:'bold',
        color: Colors.BLACK,
        fontSize:35
    },
    footerText:{
        fontWeight:'800',
        color: Colors.BLACK,
        fontSize:20
    },
    text_footer:{
        color: Colors.GREY,
        fontSize:18,
        fontWeight:'bold',
        marginTop:35
    },
    action:{
        flexDirection:'row',
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:Colors.GREY,
        paddingBottom: 10,
        marginBottom:5,
        alignItems:'center'
    },
    textInput:{
        marginHorizontal: 10
    },
    errorMsg:{ 
        fontSize: 11, 
        color: Colors.ERROR_RED 
    },
    forgotPassword:{
        textAlign:'right',
        marginTop: 15,
        fontSize:15
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
    signUp:{
        fontSize:18,
        color:'#131211'
    },
    register:{
        fontWeight:'bold'
    },
});

export default SignInScreen;


// <>
        // <SafeAreaView style={{flex:0,backgroundColor:Colors.ORANGE}}/>
        // <SafeAreaView style={{flex:1,backgroundColor:Colors.WHITE}}>
        // <KeyboardAwareScrollView>
        // <View style={styles.container} >
        //     <StatusBar backgroundColor='#009387' barStyle='light-content'/>
        //     <View style={styles.header} >
        //         <TouchableOpacity onPress={() => props.navigation.goBack()} >
        //             <View style={{marginVertical:10}} >
        //                 <Ionicon name="arrow-back-outline" size={35} color={Colors.WHITE}/>
        //             </View>
        //         </TouchableOpacity>
        //         <Text style={styles.text_header} >Welcome</Text>
        //         <Text style={styles.headerText}>Are you a chef, do catering?</Text>
        //         <Text style={styles.headerText}>Are you looking for a caterer</Text>
        //         <Text style={styles.headerText}>for an event ?</Text>
        //         <Text style={styles.headerText}>Login or Register Now.</Text>
        //     </View>
        //     <Animatable.View style={styles.footer} animation="fadeInUpBig">
        //         <Text style={styles.footerTitle}>Login</Text>
        //         <Text style={styles.footerText}>Login to your account or Register below</Text>
        //         <Text style={styles.text_footer} >Email</Text>
        //         <View style={styles.action} >
        //             <FontAwesome name="envelope" color={Colors.ORANGE} size={20}/>
        //             <TextInput 
        //                 placeholder='Your E-mail' 
        //                 style={styles.textInput}
        //                 autoCapitalize="none"
        //                 onChangeText={(val) => {emailHandler(val)}}
        //                 keyboardType="email-address"
        //                 />
        //             {validEmail ? <Animatable.View animation="bounceIn" ></Animatable.View> : null}
        //         </View>
                
        //         <Text style={[styles.text_footer,{marginTop:35}]} >Password</Text>
        //         <View style={styles.action} >
        //             <FontAwesome name="lock" color={Colors.ORANGE} size={20}/>
        //             <TextInput 
        //                 placeholder='Your Password'
        //                 secureTextEntry={touched ? false : true}
        //                 style={styles.textInput}
        //                 autoCapitalize="none"
        //                 onChangeText={(val) => {passwordHandler(val)}}
        //                 onFocus = { () => setInputTouched(true) }
        //                 />
        //             <TouchableOpacity onPress={passwordViewHandler}>
        //                 {touched ? <Feather name="eye-off" color={Colors.GREY} size={20}/> : <Feather name="eye" color={Colors.GREY} size={20}/>}
        //             </TouchableOpacity>
        //         </View>
        //         { inputTouched ? (validPassword ? null : <Text style={{color:Colors.ERROR_RED}} >Password Invalid.</Text>) : null}

        //         <TouchableOpacity onPress={()=>{
        //             props.navigation.navigate('ForgotPassword')
        //         }}>
        //             <Text style={styles.forgotPassword} > Forgot Password ? </Text>
        //         </TouchableOpacity>

        //         {/* LOGIN */}
                

        //         <View style={{alignItems:'center'}} >
        //             <View style={{flexDirection: 'row', alignItems: 'center',marginVertical:25,width:'65%'}}>
        //                 <View style={{flex: 1, height: 1, backgroundColor: Colors.GREY}} />
        //                 <View>
        //                     <Text style={{width: 50, textAlign: 'center',color:Colors.GREY}}>OR</Text>
        //                 </View>
        //                 <View style={{flex: 1, height: 1, backgroundColor: Colors.GREY}} />
        //             </View>
        //         </View>

                

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
            //     backgroundColor:Colors.WHITE,
            //     borderTopLeftRadius:30,
            //     borderTopRightRadius:30,
            //     paddingHorizontal:20,
            //     paddingVertical:30
            // },
            // text_header:{
            //     color:Colors.WHITE,
            //     fontWeight:'bold',
            //     fontSize:30
            // },
            // text_footer:{
            //     color:'#05375a',
            //     fontSize:18,
            //     fontWeight:'bold'
            // },
            // action:{
            //     flexDirection:'row',
            //     marginTop:10,
            //     borderBottomWidth:1,
            //     borderBottomColor:Colors.GREY,
            //     paddingBottom: 10,
            //     marginBottom:5
            // },
            // textInput:{
            //    flex:1,
            //    paddingLeft:10,
            //    color:'#05375a',
            //    marginLeft:5
            // },
            
            // headerText:{
            //     color:Colors.WHITE,
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
            //     marginBottom:40,
            //     color: Colors.GREY
            // },
           
            // errorMsg:{
            //     color:Colors.ERROR_RED
            // }
            //const [inputTouched, setInputTouched] = useState(false);

    // const [touched, setTouched] = useState(false)
    // const passwordViewHandler = () => {
    //     setTouched(state => !state);
    // };

    // const [validEmail, setValidEmail] = useState(false)
    // const emailHandler = (val) => {
    //     var re = /\S+@\S+\.\S+/;
    //     setValidEmail(re.test(val));
    // }

    // const [validPassword, setValidPassword] = useState(false);
    // const [password, setPassword] = useState('');
    // const passwordHandler = (val) => {
    //     setPassword(val);
    //     if(password.length>4){
    //         setValidPassword(true);
    //     }
    // }

    // const navigateHandler = () => {
    //     if( validEmail && validPassword ) {
    //         props.navigation.navigate('Home');
    //     } else {
    //         Alert.alert("Invalid Credentials","Please check the entered details before logging in.",[{text:"Okay"}]);
    //     }
    // }