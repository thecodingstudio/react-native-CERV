import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../CommonConfig/Colors';
import Address from '../../../model/addresses';

const OrderReceiptScreen = props => {

    const cartItems = props.route.params.cartItems;
    const selectedAddress = Address.find( item => { return( item.isActive === true )});

    const subTotal = cartItems.reduce( (a,c) => a + c.qty * c.price , 3.5 )

    return (
        <View style={styles.screen}>
            
            {/* Address Container */}
            <View style={{padding:20, borderBottomColor: Colors.LIGHTER_GREY, borderBottomWidth:1, backgroundColor: Colors.WHITE}}>
                <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={styles.label}>Address</Text>
                    <TouchableOpacity><Text style={{...styles.label, color: Colors.ORANGE}}>CHANGE</Text></TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', marginVertical:10}}>
                    <View style={{borderColor: Colors.LIGHTER_GREY, borderWidth:1, padding:10, borderRadius:5, marginRight:10}}>
                        <Ionicon name={selectedAddress.icon}color={Colors.ORANGE} size={25}/>
                    </View>
                    <Text style={{fontWeight:'900', width: '70%', fontSize:18}} numberOfLines={2}>{selectedAddress.address}</Text>
                </View>
            </View>

            {/* Bill Details */}
            <View style={{flex:1, padding:20, backgroundColor:Colors.WHITE}}>
                <Text style={{...styles.label,marginBottom:10}}>Bill Details</Text>
                { cartItems.map( (item) => {
                    return(
                        <View style={{flexDirection:'row', marginVertical: 5}}>
                            <Text style={{flex:3}}>{item.name}</Text>
                            <View style={{flex:1, flexDirection:'row', borderColor: Colors.GREY, borderWidth:1, borderRadius:5, height:30 ,alignItems:'center', justifyContent:'space-evenly'}}>
                                <TouchableOpacity onPress={ () => {} }><Ionicon name="remove-outline" size={20} color={Colors.ERROR_RED}/></TouchableOpacity>
                                <Text>{item.qty}</Text>
                                <TouchableOpacity onPress={ () => {} }><Ionicon name="add-outline" size={20} color="green"/></TouchableOpacity>
                            </View>
                            <Text style={{flex:1, marginLeft:10, fontWeight:'bold', textAlign:'right'}}>$ {(item.qty * item.price).toFixed(2)}</Text>
                        </View>
                    )
                } ) }
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginVertical:5}}>
                    <Text>Service Charge</Text>
                    <Text style={{fontWeight:'bold'}}>$ 1.00</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginVertical:5}}>
                    <Text>Delivery Fee</Text>
                    <Text style={{fontWeight:'bold'}}>$ 2.50</Text>
                </View>

                <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderColor: Colors.LIGHTER_GREY, borderWidth:1, borderRadius:5, marginTop:10, height:40, paddingHorizontal:10}}>
                    <Text>Apply Coupon Code</Text>
                    <Text style = {{...styles.label, color: Colors.ORANGE}}> CHECK</Text>
                </TouchableOpacity>

                <View style={{height:0, borderColor: Colors.LIGHTER_GREY, borderWidth:0.5, marginTop:15}}></View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:15, borderBottomColor: Colors.LIGHTER_GREY, borderBottomWidth:0.5, padding:10}}>
                    <Text>Sub Total</Text>
                    <Text style={{fontWeight:'bold'}}>$ {subTotal}</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:15, borderBottomColor: Colors.LIGHTER_GREY, borderBottomWidth:0.5, padding:10}}>
                    <Text>Tax</Text>
                    <Text style={{fontWeight:'bold'}}>$ 5.10</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:15, padding:10}}>
                    <Text style={styles.label}>Total</Text>
                    <Text style={{fontWeight:'bold', fontSize:18}}>$ {subTotal +5.10}</Text>
                </View>
                
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
    },
    label:{
        fontWeight:'bold', 
        fontSize: 18
    }
});

export default OrderReceiptScreen;