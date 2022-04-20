import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import Users from '../../../model/users';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast'

import * as authActions from '../../../store/actions/auth';
import ProfileOption from '../../../components/profileOption';
import{ Colors }from '../../../commonconfig';
import { postPostLogin } from '../../../helpers/ApiHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileScreen = props => {
     
    const dispatch = useDispatch();

    return (
        <View style={styles.screen} >
            
            {/* PROFILE PICTURE */}
            <View style={styles.ppContainer}>
                <Image source={{uri: Users.profile_picture }} style={styles.ppImage}/>
            </View>

            {/* OPTIONS */}

            {/* Personal Information */}
            <ProfileOption 
                title = "Personal Information"
                leftIcon = "person-outline"
                rightIcon = "chevron-forward-outline"
                onPress={() => {
                    props.navigation.navigate('PersonalInformation')
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