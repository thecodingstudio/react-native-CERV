import { Image, StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import { Colors, Images } from '../CommonConfig'

const SplashScreen = (props) => {

    useEffect( () => {
        messaging().getToken().then( async(token) => { 
            // console.log("\n\nDevice Token: ",typeof(token))
            await AsyncStorage.setItem('deviceToken', token)
         });
    },[])

    useEffect( () => {
        loadApp()
    },[])

    const loadApp = async() => {

        const isLogin = await AsyncStorage.getItem('isLogin');
        if(isLogin === "true") {
            props.navigation.dispatch(CommonActions.reset({
                index:0,
                routes: [{name:'Home'}]
            }))
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