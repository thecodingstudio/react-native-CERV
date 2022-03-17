import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';

const SignUpScreen = () => {
    return(
        <View style={StyleSheet.container} >
            <Text>SignUpScreen!</Text>
            <Button title="Click Here!" onPress={() => alert('Button Clicked!')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});

export default SignUpScreen;