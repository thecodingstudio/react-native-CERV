import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from 'react-native-elements';

import HomeScreen from'./HomeScreen';
import SearchScreen from'./SearchScreen';
import OrdersScreen from'./OrdersScreen';
import ChatScreen from'./ChatScreen';
import ProfileScreen from'./ProfileScreen';
import Colors from '../../constants/Colors';


const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const OrdersStack = createStackNavigator();
const ChatStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Tab = createBottomTabNavigator()
const MainTabScreen = () => {
    return(
        <Tab.Navigator 
            initialRouteName='Home'
            tabBarOptions={{
                activeTintColor: Colors.orange,
            }}>
                
            <Tab.Screen 
                name="Home" 
                component={HomeStackScreen}
                options={{
                    tabBarLabel:'Home',
                    tabBarIcon: ({color}) => (
                        <Icon name="home" type='simple-line-icon' color={color} size={25}/>
                    )
                }}/>
            <Tab.Screen 
                name="Search" 
                component={SearchStackScreen}
                options={{
                    tabBarLabel:'Search',
                    tabBarIcon: ({color}) => (
                        <Icon name="magnifier" type='simple-line-icon' color={color} size={25}/>
                    )
                }}/>
            <Tab.Screen 
                name="Order" 
                component={OrdersStackScreen}
                options={{
                    tabBarLabel:'Order',
                    tabBarIcon: ({color}) => (
                        <Icon name="handbag" type='simple-line-icon' color={color} size={25}/>
                    )
                }}/>
            <Tab.Screen 
                name="Chat" 
                component={ChatStackScreen}
                options={{
                    tabBarLabel:'Chat',
                    tabBarIcon: ({color}) => (
                        <Icon name="chatbubble-ellipses-outline" type='ionicon' color={color} size={25}/>
                    )
                }}/>
            <Tab.Screen 
                name="Profile" 
                component={ProfileStackScreen}
                options={{
                    tabBarLabel:'Profile',
                    tabBarIcon: ({color}) => (
                        <Icon name="user" type='simple-line-icon' color={color} size={25}/>
                    )
                }}/>
        </Tab.Navigator>
    );
};

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => {
    return(<HomeStack.Navigator>
        <HomeStack.Screen 
            name="Home" 
            component={HomeScreen}
        />
    </HomeStack.Navigator>)
};

const SearchStackScreen = ({ navigation }) => {
    return(<SearchStack.Navigator>
        <SearchStack.Screen 
            name="Search" 
            component={SearchScreen}
        />
    </SearchStack.Navigator>)
};

const OrdersStackScreen = ({ navigation }) => {
    return(<OrdersStack.Navigator>
        <OrdersStack.Screen 
            name="Orders" 
            component={OrdersScreen}
        />
    </OrdersStack.Navigator>)
};

const ChatStackScreen = ({ navigation }) => {
    return(<ChatStack.Navigator>
        <ChatStack.Screen 
            name="Chat" 
            component={ChatScreen}
        />
    </ChatStack.Navigator>)
};

const ProfileStackScreen = ({ navigation }) => {
    return(<ProfileStack.Navigator>
        <ProfileStack.Screen 
            name="Profile" 
            component={ProfileScreen}
        />
    </ProfileStack.Navigator>)
};