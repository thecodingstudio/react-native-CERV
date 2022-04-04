import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, SafeAreaView, Alert, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik'
import * as yup from 'yup'

import Colors from '../../CommonConfig/Colors';

const ForgotPasswordScreen = props => {

    return( 
        <View style={styles.screen}>
            <KeyboardAwareScrollView>
                <StatusBar backgroundColor={Colors.ORANGE} barStyle='light-content'/>

                {/* HEADER */}
                <View style={styles.header}>
                    <View>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{marginVertical:10, marginLeft:10}}>
                                <Ionicon name="arrow-back-outline" size={35} color={Colors.WHITE}/>
                        </TouchableOpacity>
                        <Text style={styles.headerLabel}>Forgot Password</Text>
                        <Text style={styles.headerText}>Reset your password immediately</Text>
                    </View>
                    <Image source={ require('../../assets/Icons/chef.png')} style={styles.image}/>
                </View>

                {/* BODY */}
                <View style={{backgroundColor: Colors.ORANGE}}>
                    <Animatable.View style={styles.body} animation="fadeInUpBig">

                        <Text style={styles.footerText}>Please enter the email address below, you will receive a link to create a new password via email.</Text>

                        <Formik 
                            initialValues={{
                                email:''
                            }}
                            onSubmit={() => {props.navigation.navigate('SignInScreen')}}
                            validationSchema = { yup.object().shape({
                                email: yup.string().email().required('Email is required.')
                            })}
                        >
                            {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                                <View>
                                    <Text style={styles.text_footer} >Email</Text>
                                    <View style={styles.action} >
                                        <FontAwesome name="envelope" color={Colors.ORANGE} size={20}/>
                                        <TextInput
                                            value={values.email}
                                            onBlur={() => setFieldTouched('email')}
                                            onChangeText={handleChange('email')}
                                            placeholder="Email"
                                            style={styles.textInput}
                                        />
                                    </View>
                                    {touched.email && errors.email &&
                                        <Text style={{ fontSize: 11, color: Colors.ERROR_RED }}>{errors.email}</Text>
                                    }

                                    <TouchableOpacity onPress={ handleSubmit } disabled={!isValid}>
                                        <View style={styles.button}>
                                            <View style={styles.signIn}>
                                                <Text style={[styles.textSign,{color:'#fff'}]} >Send Now</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                </View>)}  
                        </Formik>

                        

                    </Animatable.View>
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
        paddingVertical:30,
    },
    image:{
        marginVertical:10,
        height: 180,
        width:180
    },
    text_footer:{
        color:Colors.GREY,
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
        marginBottom:5
    },
    textInput:{
        marginHorizontal: 10
    },
    footerText:{
        fontSize:18,
        marginTop:5,
        marginBottom:5,
        color: Colors.GREY
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
});

export default ForgotPasswordScreen;