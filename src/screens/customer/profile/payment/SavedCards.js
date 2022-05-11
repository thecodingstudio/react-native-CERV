import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPostLogin } from "../../../../helpers/ApiHelpers";

import * as paymentActions from '../../../../store/actions/paymentMethod'
import CreditCardDisplay from "../../../../components/CreditCardDisplay";
import{ Colors }from '../../../../commonconfig';

const SavedCards = props => {
    
    useEffect( () => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getCards();
        })
        return unsubscribe;
    }, [props.navigation])
    
    const dispatch = useDispatch();
    
    const [isLoading, setIsLoading] = useState(true);
    const [cardList, setCardList] = useState([])

    const getCards = async() => {
        const response = await getPostLogin('/getCards')
        // console.log(response)
        const tempArray = response.data.message.data
        setCardList(tempArray)
        { tempArray.map( item => {
            return ( dispatch(paymentActions.addCard(item)) )
        } ) }
        setIsLoading(false)
    }

    if(isLoading){
        return (
            <View style={styles.loader}>
                <ActivityIndicator size={65} color={Colors.ORANGE}/>
            </View>
        )
    }

    return(
        <View style={styles.screen} > 
            <View style={styles.cardTextContainer}>
                <Text style={styles.label}>Saved Payment Methods</Text>   
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                // refreshControl
            >
                {cardList.map( item => {
                    return(
                        <View key={item.id}>
                            <CreditCardDisplay 
                                brand = {item.brand}
                                customer = { item.customer }
                                exp_month = { item.exp_month }
                                exp_year = { item.exp_year }
                                id = { item.id }
                                last4 = { item.last4 }
                                name = { item.name }
                            />
                        </View>
                    )
                } )}
            </ScrollView>

        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:20
    },
    loader:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    label:{
        fontWeight:'bold',
        fontSize:20,
        marginBottom:10,
        color: Colors.GREY
    }
});

export default SavedCards;