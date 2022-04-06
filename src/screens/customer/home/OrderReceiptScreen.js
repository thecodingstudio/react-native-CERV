import { Text, View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import * as cartActions from '../../../store/actions/cart';
import Colors from '../../../CommonConfig/Colors';
import Address from '../../../model/addresses';

const OrderReceiptScreen = props => {

    const dispatch = useDispatch();
    const cartItems = useSelector( state => {
        const updatedCartItems = [];
        for ( const key in state.Cart.items ) {
            updatedCartItems.push({
                ...state.Cart.items[key]
            });
        }
        return updatedCartItems.sort( (a,b) => a.id > b.id ? 1 : -1);
    })
    const selectedAddress = Address.find( item => { return( item.isActive === true )});

    const subTotal = cartItems.length ? cartItems.reduce( (a,c) => a + c.qty*c.price, 3.5 ) : 0;
    const total = subTotal + 5.10;

    return (
        <View style={styles.screen}>
            <View>
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
                <View style={{ backgroundColor: Colors.WHITE, padding:20 }} >
                    <Text style={styles.label}>Bill Details</Text>
                    { cartItems.map( item => {
                        return(
                            <View key={item.id} style={{marginTop:10, flexDirection:'row'}}> 
                                <View style={{flex:3, flexDirection:'row',marginRight:10}}>
                                    <Text style={{flex:2}}>{item.name}</Text>
                                    <View style={{flex:0.75,flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderColor: Colors.GREY, borderWidth:1, borderRadius: 5}}>
                                        <TouchableOpacity onPress={() =>{ dispatch(cartActions.removeFromCart(item)) }} ><Ionicon name="remove-outline" size={20} color={Colors.ERROR_RED}/></TouchableOpacity>
                                        <Text>{item.qty}</Text>
                                        <TouchableOpacity onPress={() =>{ dispatch(cartActions.addToCart(item)) }}><Ionicon name="add-outline" size={20} color={ Colors.GREEN }/></TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{flex:1}}>
                                    <Text>$ {item.itemTotal.toFixed(2)}</Text>
                                </View>
                            </View>
                        )
                    } ) }

                    { cartItems.length !== 0 ?
                    <View>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center'}}>
                            <Text style={{flex:3, marginRight:10}}>Service Charges</Text>
                            <Text style={{flex:1}}>$ 1.00</Text>
                        </View>
                        <View style={{marginTop:15, flexDirection:'row', alignItems:'center'}}>
                            <Text style={{flex:3, marginRight:10}}>Delivery Fee</Text>
                            <Text style={{flex:1}}>$ 2.50</Text>
                        </View>
                        <TouchableOpacity style={{borderColor: Colors.LIGHTER_GREY, borderWidth:1, borderRadius:5, alignItems:'center', justifyContent:'space-between', paddingHorizontal:15, flexDirection:'row', height:30, marginTop:15}}>
                            <Text style={{flex:3,fontWeight:'bold'}}>Apply Coupon Code</Text>
                            <Text style={{...styles.label, color: Colors.ORANGE, flex:1}}>CHECK</Text>
                        </TouchableOpacity>
                        <View style={{marginTop:15, flexDirection:'row', alignItems:'center', borderTopColor: Colors.LIGHTER_GREY, borderTopWidth:0.5, padding:10}}>
                            <Text style={{flex:3, marginRight:10}}>Sub Total</Text>
                            <Text style={{flex:1}}>$ {subTotal.toFixed(2)}</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center', borderTopColor: Colors.LIGHTER_GREY, borderTopWidth:0.5, padding:10}}>
                            <Text style={{flex:3, marginRight:10}}>Tax</Text>
                            <Text style={{flex:1}}>$ 5.10</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center', borderTopColor: Colors.LIGHTER_GREY, borderTopWidth:0.5, padding:10}}>
                            <Text style={{flex:3, marginRight:10, fontWeight:'bold', fontSize:18}}>Total</Text>
                            <Text style={{flex:1, fontWeight:'bold', fontSize:18}}>$ {total.toFixed(2)}</Text>
                        </View> 
                    </View>
                    :
                    <View style={{height:100, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color: Colors.LIGHTER_GREY, fontSize:25}}>CART EMPTY</Text>
                        <Text style={{color: Colors.LIGHTER_GREY, fontSize:15}}>Add some dishes now!</Text>
                    </View>}

                </View>
                <Image source={ require('../../../assets/images/paymentBorder.png')} style={{width:'100%', height:25, transform:[{rotate:'180deg'}]}}/>
            </View>
            <View style={styles.footer}>
                <Text style={styles.label}>Add Note</Text>
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