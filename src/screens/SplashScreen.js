import { Image, StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors, Images } from '../commonconfig'
import { refreshToken } from '../helpers/ApiHelpers';

const SplashScreen = (props) => {

    useEffect( () => {
        loadApp()
    },[])

    const loadApp = async() => {

        const refData = {
            refreshToken: await AsyncStorage.getItem('refreshToken')
        }
        const response = await refreshToken( refData )
        // console.log(response);
        if(!response.success){
            props.navigation.navigate('Auth')
        } else {
            await AsyncStorage.setItem('token', response.token)
            await AsyncStorage.setItem('isLogin','true')
            props.navigation.navigate('Home')
        }

        const isLogin = await AsyncStorage.getItem('isLogin');
        if(isLogin === "true") {
            props.navigation.navigate('Home')
        } else {
            props.navigation.navigate('Auth')
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