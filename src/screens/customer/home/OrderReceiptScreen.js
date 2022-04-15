import { Text, View, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React,{ useState } from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import * as cartActions from '../../../store/actions/cart';
import{ Colors, Images }from '../../../commonconfig';
import Address from '../../../model/addresses';
import PaymentOption from '../../../components/PaymentOption';

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
    const selectedAddress = useSelector( state => state.Address.activeAddress? state.Address.activeAddress : null);
    const orderType = useSelector( state => state.Cart.orderType )
    const deliveryFee = orderType === 'Delivery' ? 2.5 : 0
    const serviceCharge = 1.00
    const subTotal = (cartItems.length ? cartItems.reduce( (a,c) => a + c.qty*c.price, serviceCharge ) : 0) + deliveryFee ;
    const discountApplied = useSelector(state => (state.Cart.discount ? state.Cart.discount : null ))
    let discountAmount;
    switch(discountApplied){
        case 'PAYZP234':
            discountAmount = subTotal * 0.4;
            break;
        case '60GUJFOOD':
            discountAmount = 25;
            break;
        case '15OFF':
            discountAmount = 15;
            break;
        case 'OLA25OFF':
            discountAmount = subTotal * 0.25;
            break;
        case 'TK10OFF':
            discountAmount = subTotal * 0.10;
            break;
        default:
            discountAmount = 0;
    }
    const updatedSubTotal = subTotal - discountAmount
    const total = updatedSubTotal + 5.10;
    
    //Payment Logic
    const activePID = useSelector(state => state.Payment.activeMethodID)
    
    const allPaymentMethods = useSelector( state => state.Payment.paymentMethods ? state.Payment.paymentMethods : null);
    const activePaymentObj = allPaymentMethods? allPaymentMethods.find( item => item.pid === activePID) : null;

    function cardHide(card) {
        let hideNum = [];
          for(let i = 0; i < card.length; i++){
          if(i < card.length-4){
            hideNum.push("*");
          }else{
            hideNum.push(card[i]);
          }
        }
        return hideNum.join("");
    }


    return (
        <View style={styles.screen}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.body}>    
                {/* Address Container */}
                <View style={styles.addressContainer}>
                    <View style={styles.addressTextAlign}>
                        <Text style={styles.label}>Address</Text>
                        <TouchableOpacity onPress={ () => { props.navigation.navigate('Profile', { screen: 'SavedAddresses' }) } } >
                            <Text style={{...styles.label, color: Colors.ORANGE}}>CHANGE</Text>
                        </TouchableOpacity>
                    </View>
                    { selectedAddress.address ? <View style={styles.addressIconAlign}>
                        <View style={styles.iconContainer}>
                            <Ionicon name={selectedAddress.icon}color={Colors.ORANGE} size={25}/>
                        </View>
                        <Text style={styles.addressText} numberOfLines={2}>{selectedAddress.address}</Text>
                    </View>
                    :
                    <View style={styles.backDropContainer} >
                        <Text style={{...styles.backDropText, fontSize:25}}>NO ADDRESS FOUND</Text>
                        <Text style={{...styles.backDropText, fontSize:15}}>Add some addresses now!</Text>
                    </View>
                    }
                </View>

                <View style={styles.billDetailsContainer} >
                    <Text style={styles.label}>Bill Details</Text>
                    { cartItems.map( item => {
                        return(
                            <View key={item.id} style={styles.itemContainer}> 
                                <View style={styles.textButtonContainer}>
                                    <Text style={{flex:2}}>{item.name}</Text>
                                    <View style={styles.addRemoveContainer}>
                                        <TouchableOpacity onPress={() =>{ dispatch(cartActions.removeFromCart(item)) }} ><Ionicon name="remove-outline" size={20} color={ Colors.ERROR_RED }/></TouchableOpacity>
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
                        <View style={styles.serviceChargeContainer}>
                            <Text style={styles.transactionTitle}>Service Charges</Text>
                            <Text style={{flex:1}}>$ 1.00</Text>
                        </View>
                        <View style={styles.deliveryFee}>
                            <Text style={styles.transactionTitle}>Delivery Fee</Text>
                            <Text style={{flex:1}}>$ {deliveryFee.toFixed(2)}</Text>
                        </View>


                        {discountApplied ? 
                        <View style={styles.deliveryFee}>
                            <Text style={styles.discountTitle}>Code <Text style={{fontWeight:'bold'}}>{discountApplied}</Text> applied</Text>
                            <View style={{flex:1}}>
                                <Text style={styles.discountAmount}>- ${discountAmount.toFixed(2)}</Text>
                                <TouchableOpacity onPress={ () => { dispatch(cartActions.removeDiscount()) }}><Text style={styles.remove}>Remove</Text></TouchableOpacity>
                            </View>
                        </View>   
                        :
                        <TouchableOpacity style={styles.couponCodeContainer} onPress={ () => { props.navigation.navigate('Discount') } } >
                            <Text style={{flex:3,fontWeight:'bold'}}>Apply Coupon Code</Text>
                            <Text style={{...styles.label, color: Colors.ORANGE, flex:1}}>CHECK</Text>
                        </TouchableOpacity>}


                        <View style={styles.subTotal}>
                            <Text style={styles.transactionTitle}>Sub Total</Text>
                            <Text style={{flex:1}}>$ {updatedSubTotal.toFixed(2)}</Text>
                        </View>
                        <View style={styles.tax}>
                            <Text style={styles.transactionTitle}>Tax</Text>
                            <Text style={{flex:1}}>$ 5.10</Text>
                        </View>
                        <View style={styles.total}>
                            <Text style={styles.totalTitle}>Total</Text>
                            <Text style={{flex:1, fontWeight:'bold', fontSize:18}}>$ {total.toFixed(2)}</Text>
                        </View> 
                    </View>
                    :
                    <View style={styles.backDropContainer}>
                        <Text style={{...styles.backDropText, fontSize:25}}>CART EMPTY</Text>
                        <Text style={{...styles.backDropText, fontSize:15}}>Add some dishes now!</Text>
                    </View>}

                </View>
                <Image source={Images.PAPER_TEAR} style={{width:'100%', marginBottom:25, height:25, transform:[{rotate:'180deg'}]}}/>
                
            </View>
            <View style={styles.footer}>
                <View style={styles.addressTextAlign}>
                    <Text style={styles.label}>Payment with</Text>
                    <TouchableOpacity onPress={ () => { props.navigation.navigate('Profile', { screen: 'SavedCards' }) } } >
                        <Text style={{...styles.label, color: Colors.ORANGE}}>CHANGE</Text>
                    </TouchableOpacity>
                </View>
                <View style={{paddingVertical:10}}>
                { activePID >= 0 ? 
                    (
                        activePaymentObj.paymentType === 'card' ? 
                        <PaymentOption 
                            id={activePaymentObj.pid}
                            logo={activePaymentObj.logo}
                            mainText={cardHide(activePaymentObj.cardNumber)}
                            subText={activePaymentObj.expiryDate}
                            paymentType = {activePaymentObj.paymentType}
                        />
                        :
                        <PaymentOption 
                            id={activePaymentObj.pid}
                            logo={activePaymentObj.logo}
                            mainText={activePaymentObj.type}
                            subText={activePaymentObj.id}
                            paymentType = {activePaymentObj.paymentType}
                        />
                    )
                    : 
                    <View style={styles.backDropContainer}>
                        <Text style={{...styles.backDropText, fontSize:25}}>No Payment Method Found</Text>
                        <Text style={{...styles.backDropText, fontSize:15}}>Add some payment options now!</Text>
                    </View>
                }
                </View>
                <View>
                    <Text style={styles.label}>Add Note</Text>
                    <View style={styles.noteContainer}>
                        <TextInput 
                            placeholder='Add text here...'
                            multiline
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.makePayment}>
                    <Text style={{...styles.label, color: Colors.WHITE}}>{activePID >=0 ? "Confirm Order" : "Make Payment"}</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
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
    },
    totalTitle:{
        flex:3, 
        marginRight:10, 
        fontWeight:'bold', 
        fontSize:18
    },
    remove:{
        color: Colors.ERROR_RED
    },
    body:{
        flex:3
    },
    discountAmount:{
        color: Colors.DISCOUNT_BLUE
    },
    transactionTitle:{
        flex:3, 
        marginRight:10
    },
    discountTitle:{
        color: Colors.DISCOUNT_BLUE,
        flex:3
    },
    makePayment:{
        backgroundColor:Colors.ORANGE, 
        borderRadius:5, 
        justifyContent:'center', 
        alignItems:'center', 
        marginTop:15, 
        height:50
    },
    backDropText:{
        color: Colors.LIGHTER_GREY
    },
    backDropContainer:{
        height:100, 
        alignItems:'center', 
        justifyContent:'center'
    },
    subTotal:{
        marginTop:15, 
        flexDirection:'row', 
        alignItems:'center', 
        borderTopColor: Colors.LIGHTER_GREY, 
        borderTopWidth:0.5, 
        padding:10
    },
    noteContainer:{
        padding:10, 
        borderColor: Colors.LIGHTER_GREY , 
        borderWidth:0.5, 
        borderRadius:5,
        marginTop:5,  
        height:75 
    },
    total:{
        flexDirection:'row', 
        alignItems:'center', 
        borderTopColor: Colors.LIGHTER_GREY, 
        borderTopWidth:0.5, 
        padding:10
    },
    tax:{
        flexDirection:'row', 
        alignItems:'center', 
        borderTopColor: Colors.LIGHTER_GREY, 
        borderTopWidth:0.5, 
        padding:10
    },
    serviceChargeContainer:{
        marginTop:10, 
        flexDirection:'row', 
        alignItems:'center'
    },
    deliveryFee:{
        marginTop:15, 
        flexDirection:'row', 
        alignItems:'center'
    },
    couponCodeContainer:{
        borderColor: Colors.LIGHTER_GREY, 
        borderWidth:1, 
        borderRadius:5, 
        alignItems:'center', 
        justifyContent:'space-between', 
        paddingHorizontal:15, 
        flexDirection:'row', 
        height:30, 
        marginTop:15
    },
    footer:{
        flex:1,
        borderTopColor: Colors.LIGHTER_GREY,
        borderTopWidth:0.5,
        backgroundColor:Colors.WHITE,
        padding:20,
        justifyContent:'flex-start'
    },
    addressContainer:{
        padding:20, 
        borderBottomColor: Colors.LIGHTER_GREY, 
        borderBottomWidth:1, 
        backgroundColor: Colors.WHITE
    },
    addressTextAlign:{
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center'
    },
    iconContainer:{
        borderColor: Colors.LIGHTER_GREY, 
        borderWidth:1, 
        padding:10, 
        borderRadius:5, 
        marginRight:10
    },
    addressIconAlign:{
        flexDirection:'row', 
        marginVertical:10
    },
    addressText:{
        fontWeight:'900', 
        width: '70%', 
        fontSize:18
    },
    billDetailsContainer:{ 
        backgroundColor: Colors.WHITE, 
        padding:20 
    },
    itemContainer:{
        marginTop:10, 
        flexDirection:'row'
    },
    textButtonContainer:{
        flex:3, 
        flexDirection:'row',
        marginRight:10
    },
    addRemoveContainer:{
        flex:0.75,
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'space-between', 
        borderColor: Colors.GREY, 
        borderWidth:1, 
        borderRadius: 5
    },
});

export default OrderReceiptScreen;