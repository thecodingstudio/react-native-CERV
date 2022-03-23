import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainTabScreen from '../screens/customer/MainTabScreen';
import RootStackScreen from '../screens/auth/RootStackScreen';

const AppStack = createStackNavigator();

const AppNavigator = props => {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown:false}}>
                <AppStack.Screen name="Auth" component={RootStackScreen}/>
                <AppStack.Screen name="Home" component={MainTabScreen}/>
            </AppStack.Navigator> 
        </NavigationContainer>
);
};

export default AppNavigator;