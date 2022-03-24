import React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { Icon } from 'react-native-elements';

import Colors from '../../constants/Colors';

import HomeScreen from'./HomeScreen';
import SearchScreen from'./SearchScreen';
import OrdersScreen from'./OrdersScreen';
import ChatScreen from'./ChatScreen';
import ProfileScreen from'./ProfileScreen';
import SavedAddresses from './profile/SavedAddresses';
import PersonalInformationScreen from './profile/PersonalInformationScreen';
import MyFavourites from './profile/MyFavourites';
import ChangePassword from './profile/ChangePassword';
import EditDetailScreen from './profile/EditDetailsScreen';
import SavedCards from './payment/SavedCards';
import AddCard from './payment/AddCard';



const Tab = createBottomTabNavigator()
const MainTabScreen = () => {
    return(
        <Tab.Navigator 
            initialRouteName='Home'
            tabBarOptions={{
                activeTintColor: Colors.orange,
            }}
            >
                
            <Tab.Screen 
                name="Home" 
                component={HomeStackScreen}
                options={{
                    tabBarLabel:'Home',
                    tabBarIcon: ({color}) => (
                        <Icon name="home" type='simple-line-icon' color={color} size={25}/>
                    ),
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


const HomeStack = createStackNavigator();
const HomeStackScreen = ({ navigation }) => {
    return(<HomeStack.Navigator
        screenOptions={{
            headerTitleAlign:'center'
        }}
    >
        <HomeStack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ 
                headerTitle: props => <Image source={require('../../assets/Icons/icons8-pie-100.png')} style={{height:35, width:35}}/>,
                headerLeft: () => null,
         }}
        />
    </HomeStack.Navigator>)
};

const SearchStack = createStackNavigator();
const SearchStackScreen = ({ navigation }) => {
    return(<SearchStack.Navigator
            screenOptions={{
                headerTitleAlign:'center'
            }}
        >
        <SearchStack.Screen 
            name="Search" 
            component={SearchScreen}
            options={{
                headerLeft: () => null,
            }}
        />
    </SearchStack.Navigator>)
};


const OrdersStack = createStackNavigator();
const OrdersStackScreen = ({ navigation }) => {
    return(<OrdersStack.Navigator
        screenOptions={{
            headerTitleAlign:'center'
        }}
    >
        <OrdersStack.Screen 
            name="Orders" 
            component={OrdersScreen}
            options={{
                headerLeft: () => null,
            }}
        />
    </OrdersStack.Navigator>)
};


const ChatStack = createStackNavigator();
const ChatStackScreen = ({ navigation }) => {
    return(<ChatStack.Navigator
        screenOptions={{
            headerTitleAlign:'center'
        }}
    >
        <ChatStack.Screen 
            name="Chat" 
            component={ChatScreen}
            options={{
                headerLeft: () => null,
            }}
        />
    </ChatStack.Navigator>)
};

const ProfileStack = createStackNavigator();
const ProfileStackScreen = ({ navigation }) => {
    return(
    <ProfileStack.Navigator 
        initialRouteName='Profile'
        screenOptions={{
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
            headerTitleStyle:{
                color:'black',
                fontSize:22,
            },
            headerTitleAlign:'center'
          }}
        >
        <ProfileStack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
                headerLeft: () => null,
            }}
        />
        <ProfileStack.Screen 
            name="PersonalInformation"
            component={PersonalInformationScreen}
            options={{
                headerBackTitleVisible: false,
                headerTitle: "Personal Information"
            }}
        />
        <ProfileStack.Screen 
            name="MyFavourites"
            component={MyFavourites}
            options={{
                headerBackTitleVisible: false,
                headerTitle:"My Favourites"
            }}
        />
        <ProfileStack.Screen 
            name="SavedAddresses"
            component={SavedAddresses}
            options={{
                headerBackTitleVisible: false,
                headerTitle:"Saved Addresses"
            }}
        />
        <ProfileStack.Screen 
            name="ChangePassword"
            component={ChangePassword}
            options={{
                headerBackTitleVisible: false,
                headerTitle:"Change Password"
            }}
        />

        <ProfileStack.Screen 
            name="EditDetails"
            component={EditDetailScreen}
            options={{
                headerBackTitleVisible: false,
                headerTitle:"Edit Information"
            }}
        />

        <ProfileStack.Screen 
            name="SavedCards"
            component={SavedCards}
            options={{
                headerBackTitleVisible: false,
                headerTitle:"Payment Method"
            }}
        />
        
        <ProfileStack.Screen 
            name="AddCard"
            component={AddCard}
            options={{
                headerBackTitleVisible: false,
                headerTitle:"Add New Card"
            }}
        />
    </ProfileStack.Navigator>)
};