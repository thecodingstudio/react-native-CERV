import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Users from '../../../model/users';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast'

import * as authActions from '../../../store/actions/auth';
import * as userActions from '../../../store/actions/user';
import ProfileOption from '../../../components/profileOption';
import{ Colors }from '../../../commonconfig';
import { getPostLogin, postPostLogin, refreshToken } from '../../../helpers/ApiHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileScreen = props => {
     
    const dispatch = useDispatch();
    const user = useSelector( state => state.User )
    //console.log(user);
    const [isLoading, setIsLoading] = useState(true)

    useEffect( () => {
        getProfile();
    },[])
    
    const getProfile = async() => {
        const profileResponse = await getPostLogin('/profile')
        //console.log(profileResponse)
        if(!profileResponse.success) {
            const refToken = await AsyncStorage.getItem('refreshToken')
            const refreshData = {
                refreshToken: refToken
            }
            const refreshResponse = await refreshToken(refreshData)
            if(!refreshResponse.success) {
                console.log("refresh Fail")
            } else {
                await AsyncStorage.setItem('token', refreshResponse.data.token)
                const proReResponse = await getPostLogin('/profile')
                if(!proReResponse.success) {
                    if(proReResponse.data.error === 'Couldn\'t Find the Profile!'){
                        Toast.show('Could not find profile.')
                    }                    
                } else {
                    dispatch(userActions.userDetails(proReResponse.data.data))
                    setIsLoading(false)
                }
            }
        } else {
            dispatch(userActions.userDetails(profileResponse.data.data))
            setIsLoading(false)
        }
    }

    if( isLoading ) {
        return(
            <View style={{...styles.screen, justifyContent:'center'}}>
                <ActivityIndicator size={60} color={ Colors.ORANGE } />
            </View>
        )
    }

    return (
        <View style={styles.screen} >
            
            {/* PROFILE PICTURE */}
            <View style={styles.ppContainer}>
                <Image source={{uri: user.image }} style={styles.ppImage}/>
            </View>

            {/* OPTIONS */}

            {/* Personal Information */}
            <ProfileOption 
                title = "Personal Information"
                leftIcon = "person-outline"
                rightIcon = "chevron-forward-outline"
                onPress={() => {
                    props.navigation.navigate('PersonalInformation', { user })
                }}
            />

            {/* Payment Method */}
            <ProfileOption 
                title = "Payment Method"
                leftIcon = "wallet-outline"
                rightIcon = "chevron-forward-outline"
                onPress={() => {
                    props.navigation.navigate('SavedCards')
                }}
            />

            {/* My Favourites */}
            <ProfileOption 
                title = "My Favourites"
                leftIcon = "heart-outline"
                rightIcon = "chevron-forward-outline"
                onPress={() => {
                    props.navigation.navigate('MyFavourites')
                }}
            />

            {/* Saved Address */}
            <ProfileOption 
                title = "Saved Addresses"
                leftIcon = "location-outline"
                rightIcon = "chevron-forward-outline"
                onPress={() => {
                    props.navigation.navigate('SavedAddresses')
                }}
            />

            {/* Change Password */}
            <ProfileOption 
                title = "Change Password"
                leftIcon = "lock-open-outline"
                rightIcon = "chevron-forward-outline"
                onPress={() => {
                    props.navigation.navigate('ChangePassword')
                }}
            />

            {/* Log Out */}
            <ProfileOption 
                title = "Log Out"
                leftIcon = "log-out-outline"
                onPress={ async() => {
                    const logOutResponse = await postPostLogin('/users/logout');
                    //console.log(logOutResponse)
                    if(!logOutResponse.success) {
                        // Token Expired
                        const refToken = await AsyncStorage.getItem('refreshToken') 
                        const refreshData = {
                            refreshToken: refToken
                        }
                        const refreshResponse = await refreshToken(refreshData)
                        if(!refreshResponse.success) {
                            //Refresh Fail
                            // LOG OUT IF THIS ERROR RISES
                            console.log("REFRESH FAIL     ",refreshResponse)
                        } else {
                            // Refresh Success
                            await AsyncStorage.setItem('token', refreshResponse.data.token)
                            const reResponse = await postPostLogin('/users/logout')
                            if(reResponse.success){
                                await AsyncStorage.removeItem('token')
                                await AsyncStorage.removeItem('userID')
                                await AsyncStorage.removeItem('refreshToken')
                                Toast.show("Logged out successfully!")
                                dispatch(authActions.logOut())
                            }
                        }


                    } else {
                        await AsyncStorage.removeItem('token')
                        await AsyncStorage.removeItem('userID')
                        await AsyncStorage.removeItem('refreshToken')
                        Toast.show("Logged out successfully!")
                        dispatch(authActions.logOut())
                    }
                }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        backgroundColor:Colors.WHITE
    },
    ppContainer:{
        borderRadius:90,
        overflow:'hidden',
        marginVertical: 25
    },
    ppImage:{
        height:180,
        width:180
    }
});

export default ProfileScreen;