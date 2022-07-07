import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { Formik } from "formik";
import * as yup from 'yup';
import { ref } from 'yup';
import Toast from 'react-native-simple-toast';
import { Colors } from "../../../../CommonConfig";
import { postPostLogin } from "../../../../helpers/ApiHelpers";


const ChangePassword = ({navigation}) => {

    const [ loading, setLoading ] = useState(false)
    const [cuEye, setCuEye] = useState(true)
    const [newEye, setNewEye] = useState(true)
    const [conEye, setConEye] = useState(true)

    const onPressSave = async(values) => {
        setLoading(true)
        const data = {
            currentPassword : values.currentPass,
            newPassword : values.newPass
        }
        
        const response = await postPostLogin('/users/changePassword', data)
        if(response.success) {
            Toast.show("Password changed successfully!")
            setLoading(false)
            navigation.goBack()
        } else {
            Toast.show(response.data?.error)
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

            <Formik
                initialValues={{
                    currentPass : '',
                    newPass : '',
                    confirmPass : ''
                }}
                onSubmit={ values => onPressSave(values)}
                validationSchema = { yup.object().shape({
                    currentPass: yup.string().required('Current password is required.').min(6,'Password must be atlease 6 characters long.'),
                    newPass: yup.string().required('New password is required.').min(6,'Password must be atlease 6 characters long.'),
                    confirmPass : yup.string().required('Please confirm your password.').oneOf([ref("newPass")],"Passwords do not match.")
                })}
            >
                { ({values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit}) => (
                    <View style={{flex:1, justifyContent:'space-between', paddingBottom:25}}>
                        
                        {/* Input Fields */}
                        <View>
                            <Text style={styles.inputLabel}>Current Password</Text>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    value = { values.currentPass }
                                    onBlur={() => setFieldTouched('currentPass')}
                                    onChangeText={handleChange('currentPass')}
                                    placeholder="Current Password"
                                    secureTextEntry={cuEye}
                                />
                                <TouchableOpacity onPress={() => {setCuEye(!cuEye)}}><Feather  name="eye" size={25} color={cuEye ? Colors.GREY : Colors.ORANGE}/></TouchableOpacity>
                            </View>
                            {touched.currentPass && errors.currentPass && <Text style={styles.error}>{errors.currentPass}</Text>}   

                            <Text style={styles.inputLabel}>New Password</Text>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    value = { values.newPass }
                                    onBlur={() => setFieldTouched('newPass')}
                                    onChangeText={handleChange('newPass')}
                                    placeholder="New Password"
                                    secureTextEntry={newEye}
                                />
                                <TouchableOpacity onPress={() => {setNewEye(!newEye)}}><Feather  name="eye" size={25} color={newEye ? Colors.GREY : Colors.ORANGE}/></TouchableOpacity>
                            </View>
                            {touched.newPass && errors.newPass && <Text style={styles.error}>{errors.newPass}</Text>}

                            <Text style={styles.inputLabel}>Confirm Password</Text>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    value = { values.confirmPass }
                                    onBlur={() => setFieldTouched('confirmPass')}
                                    onChangeText={handleChange('confirmPass')}
                                    placeholder="Confirm Password"
                                    secureTextEntry={conEye}
                                />
                                <TouchableOpacity onPress={() => {setConEye(!conEye)}}><Feather  name="eye" size={25} color={conEye ? Colors.GREY : Colors.ORANGE}/></TouchableOpacity>
                            </View>
                            {touched.confirmPass && errors.confirmPass && <Text style={styles.error}>{errors.confirmPass}</Text>}
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={styles.saveButton}>
                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>

                    </View>
                )}
            </Formik>

        </View>
    )
};

const styles = StyleSheet.create({
    loader:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    screen:{
        flex:1,
        paddingHorizontal:25,
    },
    inputLabel:{
        marginTop:25,
        fontWeight:'bold',
        color: Colors.GREY,
        fontSize: 18
    },
    inputContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding: 10,
        borderBottomColor: Colors.GREY,
        borderBottomWidth: 0.5
    },
    error:{ 
        fontSize: 11, 
        color: 'red' 
    },
    saveButton:{
        paddingVertical:15,
        width:'100%',
        backgroundColor: Colors.ORANGE,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
    },
    saveText:{
        fontWeight:'bold',
        fontSize:20,
        color: Colors.WHITE
    }
});

export default ChangePassword;
