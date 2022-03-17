import React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import SelectRoleScreen from './SelectRoleScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
    return(
        <RootStack.Navigator initialRouteName='SelectRoleScreen' headerMode='none'>
            <RootStack.Screen name="SelectRoleScreen" component={SelectRoleScreen}/>
            <RootStack.Screen name="SignInScreen" component={SignInScreen} />
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
        </RootStack.Navigator>
    );
};

export default RootStackScreen;