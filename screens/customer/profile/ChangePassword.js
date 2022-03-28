import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import Feather from 'react-native-vector-icons/Feather';

import Users from '../../../model/users';
import Colors from "../../../constants/Colors";

const ChangePassword = props => {

    const [ptouched, setPTouched] = useState(false)
    const [nptouched, setNPTouched] = useState(false)
    const [cptouched, setCPTouched] = useState(false)

    const [newPassword, setNewPassword] = useState('');
    const newPasswordHandler = val => {
        setNewPassword(val);
    };
    const [confirmPassword, setConfirmPassword] = useState('');
    const confirmPasswordHandler = val => {
        setConfirmPassword(val);
    };

    const navigationHandler = () => {
        if(newPassword.length<=5){
            Alert.alert("Password too short!","Please enter a password alteast 6 characters long",[{text:"Okay"}]);
            return;
        }
        if(newPassword !== confirmPassword){
            Alert.alert("Password do not match","Please check the entered credentials",[{text:"Okay"}]);
            return;
        }
        if(newPassword === confirmPassword){
            props.navigation.goBack();
        }
    }

    return (
        <View style={styles.screen}>

        <View style={{marginHorizontal:10, justifyContent:'space-between',height:'100%'}} >
            <View>
                <Text style={styles.label} >Current Password</Text>
                <View style={styles.action} >
                    <TextInput 
                        editable={false}
                        value={Users.password}
                        placeholder={Users.password}
                        secureTextEntry={ptouched ? false : true}
                        style={{paddingHorizontal:10, color:'black'}}
                    />
                    <TouchableOpacity onPress={ () => setPTouched(!ptouched)}>
                        {ptouched ? <Feather name="eye" color={Colors.orange} size={20}/> : <Feather name="eye" color="grey" size={20}/>}
                    </TouchableOpacity>
                </View>

                <Text style={styles.label} >New Password</Text>
                <View style={styles.action} >
                    <TextInput 
                        placeholder="Enter new password"
                        secureTextEntry={nptouched ? false : true}
                        style={{paddingHorizontal:10, color:'black'}}
                        onChangeText={ (val) => {newPasswordHandler(val)} }
                    />
                    <TouchableOpacity onPress={ () => setNPTouched(!nptouched)}>
                        {nptouched ? <Feather name="eye" color={Colors.orange} size={20}/> : <Feather name="eye" color="grey" size={20}/>}
                    </TouchableOpacity>
                </View>

                <Text style={styles.label} >Confirm Password</Text>
                <View style={styles.action} >
                    <TextInput 
                        placeholder="Confirm your new password"
                        secureTextEntry={cptouched ? false : true}
                        style={{paddingHorizontal:10, color:'black'}}
                        onChangeText={ (val) => {confirmPasswordHandler(val)} }
                    />
                    <TouchableOpacity onPress={ () => setCPTouched(!cptouched)}>
                        {cptouched ? <Feather name="eye" color={Colors.orange} size={20}/> : <Feather name="eye" color="grey" size={20}/>}
                    </TouchableOpacity>
                </View>
            </View>

            {/* SAVE BUTTON */}
            <TouchableOpacity onPress={navigationHandler} >
                <View style={{backgroundColor:Colors.orange, width:'100%', height:50, alignItems:'center', justifyContent:'center', borderRadius:10}} >
                    <Text style={{fontSize:20, color:'white'}} >Save</Text>
                </View>
            </TouchableOpacity>

        </View>
            
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10
    },
    label:{
        fontSize:20,
        fontWeight:'800',
        color:Colors.grey,
        marginTop:10
    },
    action:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        paddingBottom: 10,
        marginBottom:5,
        width:'100%',
        paddingRight:10
    },
});

export default ChangePassword;

//<Text style={[styles.text_footer,{marginTop:35}]} >Password</Text>
//<View style={styles.action} >
//    <FontAwesome name="lock" color={Colors.orange} size={20}/>
//   <TextInput 
//        placeholder='Your Password'
//        secureTextEntry={touched ? false : true}
//        style={styles.textInput}
//        autoCapitalize="none"
//        onChangeText={(val) => {passwordHandler(val)}}
//        onFocus = { () => setInputTouched(true) }
//        />
//   <TouchableOpacity onPress={passwordViewHandler}>
//        {touched ? <Feather name="eye-off" color="grey" size={20}/> : <Feather name="eye" color="grey" size={20}/>}
//    </TouchableOpacity>
//</View> 