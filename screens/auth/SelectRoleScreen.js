import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Button from '../../components/Button';
import Roles from '../../components/Roles';
import Colors from '../../constants/Colors';

const SelectRoleScreen = props => {

    const [customerActive, setCustomerActive] = useState(false);
    const [catererActive, setCatererActive] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const customerActiveHandler = () => {
        setCustomerActive(true);
        setCatererActive(false);
        setShowButton(true);
    }

    const catererActiveHandler = () => {
        setCustomerActive(false);
        setCatererActive(true);
        setShowButton(true);
    }


    return(
        <SafeAreaView>
            <View style={styles.screen} >

                {/* Title Text ----> */}
                <View style={styles.header} >
                    <Text style={styles.title} >Select your Role</Text>
                    <Text style={styles.text} >How do you want to use <Text style={styles.CERV} >CERV ?</Text></Text>
                </View>

                {/* Roles Section ----> */}
                <View style={styles.body}>
                    <Roles style={styles.roles} title="Customer" image={ customerActive ? require('../../assets/Icons/icons8-user-100-active.png') : require('../../assets/Icons/icons8-user-100-inactive.png')} onClick={customerActiveHandler} />
                    <Roles style={styles.roles} title="Caterer" image={ catererActive ? require('../../assets/Icons/icons8-restuarant-100-active.png') : require('../../assets/Icons/icons8-restuarant-100-inactive.png')} onClick={catererActiveHandler} />
                </View>

                {/* Button ---->*/}
                <View style={styles.footer} >
                    {showButton && <Button 
                    style={styles.button}
                    title={customerActive ? 'I\'m a Customer' : 'I\'m a Caterer'}
                    onPress={()=>{
                        props.navigation.navigate('SignInScreen');
                    }}
                    />}
                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen:{
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        width:'100%'
    },
    header:{
        flex:1,
        width:'100%',
        padding:20
    },
    body:{
        flex:3,
        justifyContent:'space-between',
        alignItems:'center'
    },
    footer:{
        flex:1,
        justifyContent:'flex-end',
        width:'80%',
    },
    title:{
        fontWeight:'bold',
        fontSize: 35
    },
    text:{
        fontWeight:'bold',
        fontSize:20,
        color:Colors.grey
    },
    CERV:{
        color:Colors.orange
    }
});

export default SelectRoleScreen;
