import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SearchScreen = props => {
    return (
        <View style={styles.screen} >
            <Text>SearchScreen!</Text>
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

export default SearchScreen;