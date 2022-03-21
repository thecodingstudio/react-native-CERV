import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SelectRoleScreen from './SelectRoleScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import NumberVerificationScreen from './NumberVerificationScreen';
import VerifyScreen from './VerifyScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
    return(
        <RootStack.Navigator initialRouteName='SelectRoleScreen' headerMode='none'>
            <RootStack.Screen name="SelectRoleScreen" component={SelectRoleScreen}/>
            <RootStack.Screen name="SignInScreen" component={SignInScreen} />
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
            <RootStack.Screen name="NumberVerificationScreen" component={NumberVerificationScreen} />
            <RootStack.Screen name="VerifyScreen" component={VerifyScreen} />
        </RootStack.Navigator>
    );
};

export default RootStackScreen;