import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import{ Colors }from '../../../../commonconfig';

import CardDisplay from "../../../../components/CardDisplay";
import OtherPaymentDisplay from "../../../../components/OtherPaymentDisplay";

import cards from "../../../../model/cards";
import otherPayment from "../../../../model/otherPayment";

const SavedCards = props => {
    return(
        <View style={styles.screen} > 
            
            {/* SAVED CARDS */}
            <View style={{...styles.savedCards,borderBottomColor:'#ccc', borderBottomWidth:2}}>
                <View style={styles.textRow} >
                    <Text style={styles.title} >Saved Cards</Text>
                    <TouchableOpacity onPress={ () => {
                        props.navigation.navigate('AddCard')
                    }} >
                        <Text style={styles.button}>ADD CARD</Text>
                    </TouchableOpacity>
                </View>

                {/* CARDS */}
                <CardDisplay 
                    image = { cards.MasterCard.logo }
                    cardNumber = {cards.MasterCard.cardNumber}
                    expiry = { cards.MasterCard.expiryDate }
                    selectable={false}
                />
                <CardDisplay 
                    image = { cards.Visa.logo }
                    cardNumber = {cards.Visa.cardNumber}
                    expiry = { cards.Visa.expiryDate }
                    selectable={false}
                />
                
            </View>

            {/* OTHER PAYMENT MODES */}
            <View style={styles.savedCards}>
            
                <View style={styles.textRow} >
                    <Text style={styles.title} >Other Payment Methods</Text>
                </View>

                {/* CARDS */}
                <OtherPaymentDisplay 
                    image = { otherPayment.ApplePay.logo }
                    type = { otherPayment.ApplePay.type }
                    id = { otherPayment.ApplePay.id }
                    selectable={false}
                />

                <OtherPaymentDisplay 
                    image = { otherPayment.GooglePay.logo }
                    type = { otherPayment.GooglePay.type }
                    id = { otherPayment.GooglePay.id }
                    selectable={false}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    savedCards:{
        flex:1,
        width:'90%',
    },
    textRow:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginTop:15
    },
    title:{
        fontSize:20,
        color:'#5F5959',
        fontWeight:'600'
    },
    button:{
        fontSize:20,
        color: Colors.ORANGE,
        fontWeight:'600'
    },
    bottomButton:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:40,
        marginTop:15,
        backgroundColor:Colors.ORANGE,
        borderRadius:5
    },
    makePayment:{
        color:Colors.WHITE,
        fontSize:20,
        fontWeight:'700'
    }
});

export default SavedCards;