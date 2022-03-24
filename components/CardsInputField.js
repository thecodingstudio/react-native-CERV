import React from "react";
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

const CardsInputField = props => {
    return (
        <KeyboardAwareScrollView>
            <View style={styles.screen} >
                    {/* Title */}
                    <Text style={styles.title}>{props.title}</Text>
                    
                    {/* TextField & Logo */}
                    <View style={styles.inputField} >
                        <TextInput />
                        <Animatable.View animation="bounceIn" ><Feather name="check-circle" color="green" size={20}/></Animatable.View>
                    </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    container:{
        width:'100%',
        justifyContent:'center',
        borderColor: 'black',
        borderWidth:1
    },
    title:{
        fontSize:20,
        fontWeight:'700',
        color:'#999',
        textAlign:'left'
    },
    inputField:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
});

export default CardsInputField;
