import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CardsInputField from "../../../components/CardsInputField";

const AddCard = props => {
    return(
        <View style={styles.screen} > 
            <CardsInputField
                title="CARD NUMBER"
            />
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});

export default AddCard;