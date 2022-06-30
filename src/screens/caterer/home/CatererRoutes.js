import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

//Menu Screens
import MenuScreen from './menu/MenuScreen';
import { Colors } from '../../../CommonConfig';
import OrdersScreen from './orders/OrdersScreen';
import ChatScreen from './chat/ChatScreen';
import ProfileScreen from './profile/ProfileScreen';

//Order Screens

//Chat Screens

//Profile Screens

const MenuStack = createStackNavigator()
const OrderStack = createStackNavigator()
const ChatStack = createStackNavigator()
const ProfileStack = createStackNavigator()

const MenuStackScreen = () => {
    return(
        <MenuStack.Navigator
            initialRouteName='MenuScreen'
            screenOptions={{
                headerTitleAlign:'center'
            }}
        >
            <MenuStack.Screen 
                name='MenuScreen'
                component={MenuScreen}
                options={{
                    headerTitle: 'Menu'
                }}
            />
        </MenuStack.Navigator>
    )
}

const OrderStackScreen = () => {
    return(
        <OrderStack.Navigator
            initialRouteName='MenuScreen'
            screenOptions={{
                headerTitleAlign:'center'
            }}
        >
            <OrderStack.Screen 
                name='OrderScreen'
                component={OrdersScreen}
                options={{
                    headerTitle: 'Home'
                }}
            />
        </OrderStack.Navigator>
    )
}

const ChatStackScreen = () => {
    return(
        <ChatStack.Navigator
            initialRouteName='ChatScreen'
            screenOptions={{
                headerTitleAlign:'center'
            }}
        >
            <ChatStack.Screen 
                name='ChatScreen'
                component={ChatScreen}
                options={{
                    headerTitle: 'Chat'
                }}
            />
        </ChatStack.Navigator>
    )
}

const ProfileStackScreen = () => {
    return (
        <ProfileStack.Navigator
            initialRouteName='ProfileScreen'
            screenOptions={{
                headerTitleAlign:'center'
            }}
        >
            <ProfileStack.Screen 
                name='ProfileScreen'
                component={ProfileScreen}
                options={{
                    headerTitle: 'Profile',
                    headerStyle: {
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 3.84,
                        elevation: 5,
                    },
                }}
            />
        </ProfileStack.Navigator>
    )
}

const CatererTab = createBottomTabNavigator()
const CatererRoutes = () => {
    const getTabBarVisibility = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        const hideOnScreens = []
        if(hideOnScreens.indexOf(routeName) > -1) return false;
        return true;
    }

    return(
        <CatererTab.Navigator
            initialRouteName='Menu'
            tabBarOptions={{
                activeTintColor: Colors.ORANGE
            }}
        >
            <CatererTab.Screen 
                name='Menu'
                component={MenuStackScreen}
                options={ ({route}) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: 'Menu',
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name='menu-book' color={color} size={25} />
                    )
                })}
            />
            <CatererTab.Screen 
                name='Orders'
                component={OrderStackScreen}
                options={ ({route}) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name='shopping-bag' color={color} size={25} />
                    )
                })}
            />
            <CatererTab.Screen 
                name='Chat'
                component={ChatStackScreen}
                options={ ({route}) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name='chat' color={color} size={25} />
                    )
                })}
            />
            <CatererTab.Screen 
                name='Profile'
                component={ProfileStackScreen}
                options={ ({route}) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name='person' color={color} size={25} />
                    )
                })}
            />
        </CatererTab.Navigator>
    )
}

export default CatererRoutes;