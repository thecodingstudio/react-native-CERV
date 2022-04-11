import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import CustomerRoutes from '../screens/customer/CustomerRoutes';
import RootStackScreen from '../screens/auth/RootStackScreen';

const AppNavigator = props => {

    const isAuth = useSelector(state => !!state.Auth.token)
    
    return (
        <NavigationContainer>
            {isAuth && <CustomerRoutes />}
            {!isAuth && <RootStackScreen />}
        </NavigationContainer>
);
};

export default AppNavigator;