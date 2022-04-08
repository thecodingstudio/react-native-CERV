import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react'

import DiscountCoupon from '../../../components/DiscountCoupon';
import{ Colors }from '../../../commonconfig';
import discounts from '../../../model/discounts';
import * as cartActions from '../../../store/actions/cart';
import { useDispatch } from 'react-redux';

const DiscountCodeScreen = props => {
    const dispatch = useDispatch();

    const pressHandler = (code) => {
        dispatch(cartActions.applyDiscount(code));
        props.navigation.goBack();
    }
    return (
        <View style={styles.screen}>
            <ScrollView showsVerticalScrollIndicator={false}>
            {discounts.map( item => {
                return(
                    <View key={item.id}>
                        <DiscountCoupon 
                            offer = {item.offer}
                            code = {item.code}
                            onPress = { () => {pressHandler(item.code)} }
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
        padding:20,
        backgroundColor: Colors.WHITE
    }
});

export default DiscountCodeScreen;
