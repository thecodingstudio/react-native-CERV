import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import Users from '../../../model/users';
import ProfileOption from '../../../components/profileOption';
import{ Colors }from '../../../commonconfig';
const ProfileScreen = props => {
    
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
                onPress={() => {
                    props.navigation.navigate('SignInScreen')
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