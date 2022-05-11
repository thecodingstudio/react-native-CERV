import { Image, StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

import { Colors, Images } from '../commonconfig'
import { refreshToken } from '../helpers/ApiHelpers';

const SplashScreen = (props) => {

    useEffect( () => {
        loadApp()
    },[])

    const loadApp = async() => {

        // const refToken = await AsyncStorage.getItem('refreshToken') || '$'
        
        // if(refToken !== '$') {
        //     const refData = {
        //         refreshToken:  refToken
        //     }
        //     const response = await refreshToken( refData )
        //     // console.log(response);
        //     if(!response.success){
        //         props.navigation.navigate('Auth')
        //     } else {
        //         await AsyncStorage.setItem('token', response.data.token)
        //         await AsyncStorage.setItem('isLogin','true')
        //     }
        // } else {
        //     props.navigation.navigate('Auth')
        // }

        const isLogin = await AsyncStorage.getItem('isLogin');
        if(isLogin === "true") {
            // const refToken = await AsyncStorage.getItem('refreshToken')
            // const refData = {
            //     refreshToken: refToken
            // }
            // const response = await refreshToken(refData)
            // console.log(response);
            // if(!response.success){
            //     props.navigation.dispatch( CommonActions.reset({
            //         index:0,
            //         routes: [{name: 'Auth'}]
            //     }))
            // } else {
            //     await AsyncStorage.setItem('token', response.data.token)
                props.navigation.dispatch(CommonActions.reset({
                    index:0,
                    routes: [{name:'Home'}]
                }))
            // }
           
        } else {
            props.navigation.dispatch(CommonActions.reset({
                index:0,
                routes: [{name:'Auth'}]
            }))
        }
    }

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={Colors.ORANGE}/>
            <Image source={Images.LOGO} style={{width: 200, height:200}}/>
            <ActivityIndicator color={Colors.WHITE}  size={50}/>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-evenly',
        padding:10,
        backgroundColor: Colors.ORANGE
    }
})