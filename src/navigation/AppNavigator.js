import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomerRoutes from '../screens/customer/CustomerRoutes';
import RootStackScreen from '../screens/auth/RootStackScreen';
import { View, ActivityIndicator } from 'react-native';

import { Colors } from '../commonconfig';

const AppNavigator = props => {

    const [isLoading, setIsLoading] = useState(true)

    const LOGIN = 'LOGIN'
    let token;
    const dispatch = useDispatch()

    useEffect( async() => {
        token = await AsyncStorage.getItem('token');
        dispatch({ type: LOGIN, token: token})
        setIsLoading(false)
    },[])

    const isAuth = useSelector(state => !!state.Auth.token)
    
    return (
        <NavigationContainer>
            {isLoading ? (
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <ActivityIndicator size={100} color={Colors.ORANGE}/>
                </View>
                ) : (
                    isAuth ? <CustomerRoutes /> : <RootStackScreen />
                )
            }
        </NavigationContainer>
    );
};

export default AppNavigator;