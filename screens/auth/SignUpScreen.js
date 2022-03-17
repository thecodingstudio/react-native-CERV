import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Image, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Colors from '../../constants/Colors';

const SignUpScreen = props => {

    const [data, setData] = useState({
        username:'',
        email:'',
        password:'',
        confirm_password:'',
        check_textInputChange: false,
        check_usernameChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true
    });

    const textInputChange = (val) => {
        if(val.length!== 0){
            setData({
                ...data,
                email:val,
                check_textInputChange:true
            })
        } else {
            setData({
                ...data,
                email:val,
                check_textInputChange: false
            })
        }
    };

    const usernameChange = (val) => {
        if(val.length!== 0){
            setData({
                ...data,
                username:val,
                check_usernameChange:true
            })
        } else {
            setData({
                ...data,
                username:val,
                check_usernameChange: false
            })
        }
    };

    const passwordChangeHandle = (val) => {
        setData({
            ...data,
            password:val
        })
    };

    const passwordConfirmHandle = (val) => {
        setData({
            ...data,
            confirm_password:val
        })
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        })
    }

    return(
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
                        <Image source={require('../../assets/Icons/icons8-person-100.png')} style={{height:100,width:100}} />
                    </View>
                    <View style={styles.add_icon}>
                        <Ionicon name="add-outline" color={Colors.orange} size={30}/>
                    </View>
                </View>

                <Text style={styles.text_footer} >User Name</Text>
                <View style={styles.action} >
                    <FontAwesome name="user" color={Colors.orange} size={20}/>
                    <TextInput 
                        placeholder='Your Username' 
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => usernameChange(val)}
                        />
                    {data.check_usernameChange ? <Animatable.View animation="bounceIn" ><Feather name="check-circle" color="green" size={20}/></Animatable.View> : null }
                </View>

                <Text style={[styles.text_footer,{marginTop:20}]} >Email</Text>
                <View style={styles.action} >
                    <FontAwesome name="envelope" color={Colors.orange} size={20}/>
                    <TextInput 
                        placeholder='Your E-mail' 
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        />
                    {data.check_textInputChange ? <Animatable.View animation="bounceIn" ><Feather name="check-circle" color="green" size={20}/></Animatable.View> : null }
                </View>
                
                <Text style={[styles.text_footer,{marginTop:20}]} >Password</Text>
                <View style={styles.action} >
                    <FontAwesome name="lock" color={Colors.orange} size={20}/>
                    <TextInput 
                        placeholder='Your Password'
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => passwordChangeHandle(val) }
                        />
                    <TouchableOpacity onPress={ updateSecureTextEntry }>
                        {data.secureTextEntry ? <Feather name="eye-off" color="grey" size={20}/> : <Feather name="eye" color="grey" size={20}/>}
                    </TouchableOpacity>
                </View>

                <Text style={[styles.text_footer,{marginTop:20}]} >Confirm Password</Text>
                <View style={styles.action} >
                    <FontAwesome name="lock" color={Colors.orange} size={20}/>
                    <TextInput 
                        placeholder='Confirm Your Password'
                        secureTextEntry={data.confirm_secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => passwordConfirmHandle(val) }
                        />
                    <TouchableOpacity onPress={ updateConfirmSecureTextEntry }>
                        {data.confirm_secureTextEntry ? <Feather name="eye-off" color="grey" size={20}/> : <Feather name="eye" color="grey" size={20}/>}
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row', marginTop:10}} >
                    <Ionicon name="square-outline" color={Colors.grey} size={20}/>
                    <Text style={styles.tandc} >I Agree to the <Text style={styles.sp_tandc} >Terms {'&'} Conditions</Text> and <Text style={styles.sp_tandc}>Privacy Policy</Text></Text>
                </View>


                {/* LOGIN */}
                <View style={styles.button}>
                    <View style={styles.signIn}>
                        <Text style={[styles.textSign,{color:'#fff'}]} >Next</Text>
                    </View>
                </View>
            </Animatable.View>
        </View>
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
        borderWidth:1
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