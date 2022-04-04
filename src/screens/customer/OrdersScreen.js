import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrdersScreen = props => {
    return (
        <View style={styles.screen} >
            <Text>OrdersScreen!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});

export default OrdersScreen;