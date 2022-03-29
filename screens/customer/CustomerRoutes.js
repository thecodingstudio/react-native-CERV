import React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { Icon } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../../constants/Colors';

// Home Screens
import HomeScreen from'./home/HomeScreen';
import NotificationScreen from './home/NotificationScreen';
import FAQScreen from './home/FAQScreen';
import FilterScreen from './home/FilterScreen';

// Search Screens
import SearchScreen from'./SearchScreen';

//Orders Screens
import OrdersScreen from'./OrdersScreen';

//Chat Screens
import ChatScreen from'./chat/ChatScreen';
import MessagesScreen from './chat/MessagesScreen';

//Profile Screens
import ProfileScreen from'./profile/ProfileScreen';
import SavedAddresses from './profile/SavedAddresses';
import PersonalInformationScreen from './profile/personal_information/PersonalInformationScreen';
import EditDetailScreen from './profile/personal_information/EditDetailsScreen';
import MyFavourites from './profile/MyFavourites';
import ChangePassword from './profile/ChangePassword';
import SavedCards from './profile/payment/SavedCards';
import AddCard from './profile/payment/AddCard';



const Tab = createBottomTabNavigator()
const CustomerRoutes = () => {
    const getTabBarVisibility = (route) => {
        const routeName = route.state ? route.state.routes[route.state.index].name : '' ;

        if(routeName === 'Chat' || routeName === 'FAQ') {
            return false;
        }
        return true;
    }

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
                options={ ({route}) => ({ 
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel:'Home',
                    tabBarIcon: ({color}) => (
                        <Icon name="home" type='simple-line-icon' color={color} size={25}/>
                    ),
                })}/>
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
                name="ChatScreen" 
                component={ChatStackScreen}
                options={ ({route}) => ({ 
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel:'Chat',
                    tabBarIcon: ({color}) => (
                        <Icon name="chatbubble-ellipses-outline" type='ionicon' color={color} size={25}/>
                    )
                })}/>
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

export default CustomerRoutes;


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
                headerLeft: () => 
                <TouchableOpacity style={{marginLeft:15, alignItems:'center'}} onPress={ () => {navigation.navigate('FAQ')} } >
                    <Feather name="help-circle" size={25} color={Colors.grey}/>
                </TouchableOpacity>,
                headerRight: () => (
                    <TouchableOpacity style={{marginRight:15, alignItems:'center'}} onPress={ () => {navigation.navigate('Notification')} } >
                        <Feather name="bell" size={25} color={Colors.grey}/>
                    </TouchableOpacity>
                )
         }}
        />
        <HomeStack.Screen name="Notification" component={NotificationScreen} options={{
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
        }}/>

        <HomeStack.Screen name="FAQ" component={FAQScreen} />

        <HomeStack.Screen 
            name="SavedAddresses"
            component={SavedAddresses}
            options={{
                headerBackTitleVisible: false,
                headerTitle:"Saved Addresses",
            }}
        />

        <HomeStack.Screen name="Filter" component={FilterScreen} options={{headerShown:false}}/>

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
        initialRouteName='Messages'
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
            headerTitleAlign:'center'
        }}
    >
        <ChatStack.Screen 
            name="Messages"
            component={MessagesScreen}
            options={{
                headerTitle:'Chat',
                headerLeft: () => null
            }}
        />
        <ChatStack.Screen 
            name="Chat" 
            component={ChatScreen}
            options={ ({route}) => ({ title: route.params.userName }) }
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
                headerTitle:"Saved Addresses",
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