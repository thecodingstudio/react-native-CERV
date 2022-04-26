import { Image, StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors, Images } from '../commonconfig'

const SplashScreen = (props) => {

    useEffect( () => {
        loadApp()
    },[])

    const loadApp = async() => {
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
        alignItems:'center',
        justifyContent:'space-evenly',
        flex:1,
        padding:10,
        backgroundColor: Colors.ORANGE
    }
})