import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react'

import DiscountCoupon from '../../../components/DiscountCoupon';
import{ Colors }from '../../../commonconfig';
import discounts from '../../../model/discounts';

const DiscountCodeScreen = () => {
    return (
        <View style={styles.screen}>
            <ScrollView showsVerticalScrollIndicator={false}>
            {discounts.map( item => {
                return(
                    <View key={item.id}>
                        <DiscountCoupon 
                            offer = {item.offer}
                            code = {item.code}
                            onPress = { () => {} }
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
