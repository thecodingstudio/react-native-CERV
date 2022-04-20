import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import StepIndicator from 'react-native-step-indicator'
import Ionicon from 'react-native-vector-icons/Ionicons';

import Caterer from '../../../model/caterer'
import { Colors, Images } from '../../../commonconfig'

const OrderDetailScreen = props => {

    const selectedOrderID = props.route.params.id
    const allOrders = useSelector(state => state.Order.orders)
    const selectedOrder = allOrders.find(item => item.orderID === selectedOrderID)
    //console.log(selectedOrder);
    
    const selectedCaterer = Caterer.find( item => item.id === selectedOrder.catererId)

    //Progress Steps
    const stepIndicatorStyles = {
        stepIndicatorSize : 10,
        currentStepIndicatorSize: 20,
        currentStepStrokeWidth: 2,
        separatorUnFinishedColor : Colors.LIGHTER_GREY,
        separatorFinishedColor : Colors.ORANGE,
        labelSize: 15,
        labelColor: Colors.LIGHTER_GREY,
        stepIndicatorFinishedColor: Colors.ORANGE,
        stepIndicatorUnFinishedColor : Colors.LIGHTER_GREY,
        stepIndicatorCurrentColor: Colors.ORANGE,
        currentStepStrokeWidth : 0,
        currentStepLabelColor: Colors.ORANGE
    }

    // Date & Time Processing
    const orderPlaceDate  = selectedOrder.orderPlaceDate
    const monthNumber = orderPlaceDate.slice(0,2).replace(/^0+/, '');
    const monthNames = [ "", 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = orderPlaceDate.slice(3,5)
    const year = "20" + orderPlaceDate.slice(6,8)
    const orderDate = date + " " + monthNames[monthNumber] + " " + year

    const orderPlaceTime = selectedOrder.orderPlaceTime
    const hour = orderPlaceTime.slice(0,2)
    const ampm = hour >=12 ? ' PM' : ' AM'
    const minutes = orderPlaceTime.slice(3,5)
    const hour1 = hour%12 === 0 ? '12' : hour%12
    const hour12 = hour1 < 10 ? '0' + hour1 : hour1
    const orderTime = hour12 + ":" + minutes + ampm 

    return (
        <View style={styles.screen}>
            
            <View style={{paddingVertical:15, backgroundColor: Colors.WHITE}}>
                {/* Progress Steps */}
                <StepIndicator 
                    stepCount={5}
                    labels={['Order Placed', 'Order Accepted', 'Preparing Food', 'Dispatched for Delivery','Order Delivered']}
                    customStyles={stepIndicatorStyles}
                    renderStepIndicator={ () => { return(<View/>) }}
                    //currentPosition={selectedOrder.orderStage}
                    currentPosition={selectedOrder.orderStatus}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Order Details */}
                <View style={styles.orderContainer}>
                    
                    {/* Caterer Container */}
                    <View style={styles.catererContainer}>
                        <Image source={{uri: selectedCaterer.image}} style={styles.catererImage}/>
                        <View style={styles.catererTextContainer}>
                            <Text style={styles.catererName}>{selectedCaterer.name}</Text>
                            <Text style={styles.catererAddress}>{selectedCaterer.address}</Text>
                        </View>
                    </View>

                    {/* Items List */}
                    <View style={styles.itemListContainer}>
                        {selectedOrder.items.map( item => {
                            return (
                                <View key={item.id} style={styles.itemContainer}>
                                    <View>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemQty}>{item.qty} Dishes</Text>
                                    </View>
                                    <Text style={styles.itemPrice}>$ {item.itemTotal}</Text>
                                </View>
                            )
                        } )}
                    </View>

                    {/* Other Details */}
                    <View style={styles.otherDetailContainer}>
                        <Text style={styles.otherDetailLabel}>ORDER TYPE</Text>
                        <Text style={styles.otherDetailText}>{selectedOrder.orderType}</Text>

                        {selectedOrder.orderType === 'Delivery' ? (
                            <View style={{marginVertical:10}}>
                                <Text style={{...styles.otherDetailLabel, fontSize:12}}>Delivery Fee based on how far the customer location is</Text>
                                <Text style={{...styles.otherDetailText, marginBottom:5}}>*   5Km distance charge $2.50</Text>
                                <Text style={styles.otherDetailText}>*   10Km distance charge $5.00</Text>
                            </View>
                        ) : null}

                        <Text style={styles.otherDetailLabel}>ORDER PLACED ON</Text>
                        <Text style={styles.otherDetailText}>{orderDate} at {orderTime}</Text>

                        <Text style={styles.otherDetailLabel}>AMOUNT</Text>
                        <Text style={styles.otherDetailText}>$ {selectedOrder.totalAmount.toFixed(2)}</Text>
                    </View>

                    {/* Delivery Date & Time */}
                    <View style={styles.deliveryDetailContainer}>
                        <Text style={styles.deliveryLabel}>Delivery Date and Time</Text>
                        <Text style={styles.deliveryText}>{selectedOrder.deliveryDate} at {selectedOrder.deliveryTime}</Text>
                    </View>

                    {/* Delivery Person */}
                    <View style={styles.deliveryPersonContainer}>
                        <View>
                            <Text style={styles.deliveryLabel}>Delivery Person</Text>
                            <Text style={styles.deliveryText}>John Martyn</Text>
                        </View>
                        <TouchableOpacity style={styles.chatButton}>
                            <Text style={styles.chatText}>Chat</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Bill Details */}
                    <View style={{borderBottomColor: Colors.LIGHTER_GREY, borderBottomWidth:0.5, paddingVertical:10}}>
                        <Text style={{...styles.otherDetailLabel, marginBottom:10}}>Bill Details</Text>
                        { selectedOrder.items.map( item => {
                            return(
                                <View key={item.id}>
                                    <View style={styles.billDetailRow}>
                                        <Text style={{flex:3}}>{item.name} ({item.qty} Dishes)</Text>
                                        <Text style={{flex:0.5}}>$ {item.itemTotal.toFixed(2)}</Text>
                                    </View>
                                </View>
                            )
                        } ) }

                        <View style={styles.billDetailRow}>
                            <Text style={{flex:3}}>Service Charge</Text>
                            <Text style={{flex:0.5}}>$ 1.00</Text>
                        </View>

                        <View style={styles.billDetailRow}>
                            <Text style={{flex:3}}>Delivery Fee</Text>
                            <Text style={{flex:0.5}}>{selectedOrder.orderType === 'Delivery' ? '$ 2.50' : '$ 0.00' }</Text>
                        </View>
                    </View>

                    <View style={{...styles.billDetailRow, borderBottomColor: Colors.LIGHTER_GREY, borderBottomWidth:0.5, paddingVertical:10}}>
                        <Text style={{flex:3}}>Promo Discount</Text>
                        <Text style={{flex:0.5}}>-$ {selectedOrder.discountAmount.toFixed(2)}</Text>
                    </View>

                    <View style={{...styles.billDetailRow, borderBottomColor: Colors.LIGHTER_GREY, borderBottomWidth:0.5, paddingVertical:10}}>
                        <Text style={{flex:3}}>Sub Total</Text>
                        <Text style={{flex:0.5}}>$ {(selectedOrder.totalAmount.toFixed(2) - 5.10 ).toFixed(2)}</Text>
                    </View>

                    <View style={{...styles.billDetailRow, borderBottomColor: Colors.LIGHTER_GREY, borderBottomWidth:0.5, paddingVertical:10}}>
                        <Text style={{flex:3}}>Tax</Text>
                        <Text style={{flex:0.5}}>$ 5.10</Text>
                    </View>

                    <View style={{...styles.billDetailRow, paddingVertical:10}}>
                        <Text style={{flex:3, fontWeight:'bold', fontSize:20}}>Total</Text>
                        <Text style={{flex:0.7, fontWeight:'bold', fontSize:20}}>$ {selectedOrder.totalAmount.toFixed(2)}</Text>
                    </View>
                </View>
                <Image source={Images.PAPER_TEAR} style={{width:'100%', height:30, marginBottom:50,transform:[{ rotate: '180deg'}]}}/>

                {/* Address Bar */}
                <View style={styles.addressContainer}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:10}}> 
                        <Text style={styles.addressLabel}>ADDRESS</Text>
                        <TouchableOpacity><Text style={styles.change}>CHANGE</Text></TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', flex:1, paddingHorizontal:15, marginTop:5}}>
                        <View style={styles.iconContainer}>
                            <Ionicon name={selectedOrder.address.icon} size={30} color={Colors.ORANGE}/>
                        </View>
                        <Text style={styles.address}>{selectedOrder.address.address}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default OrderDetailScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor: Colors.BACKGROUND_GREY,
    },
    iconContainer:{
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        borderWidth:0.5,
        borderColor: Colors.GREY,
        borderRadius:5,
        marginRight: 10
    },
    address:{
        fontWeight:'600',
        fontSize:18,
        maxWidth:'80%'
    },
    addressContainer:{
        backgroundColor: Colors.WHITE,  
        paddingTop:15,
        paddingBottom:25
    },
    change:{
        fontWeight:'bold',
        fontSize:20,
        color: Colors.ORANGE
    },
    addressLabel:{
        fontWeight:'bold',
        fontSize: 20
    },
    billDetailRow:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        paddingVertical:5
    },
    orderContainer:{
        flex:1,
        padding:10,
        backgroundColor: Colors.WHITE
    },
    chatButton:{
        paddingVertical: 10,
        paddingHorizontal:20,
        backgroundColor: Colors.ORANGE,
        borderRadius:5
    },
    chatText:{
        fontWeight:'bold',
        color: Colors.WHITE
    },
    catererContainer:{
        paddingVertical:10,
        flexDirection:'row',
        borderBottomColor: Colors.LIGHTER_GREY,
        borderBottomWidth: 0.5
    },
    catererTextContainer:{
        flex: 5,
        paddingHorizontal:10,
        justifyContent:'space-evenly',
    },
    catererImage:{
        flex: 1,
        aspectRatio:1
    },
    catererName:{
        fontWeight:'bold',
        fontSize:20
    },
    catererAddress:{
        fontWeight:'600',
        fontSize:15
    },
    itemListContainer:{
        paddingVertical:10,
        borderBottomColor: Colors.LIGHTER_GREY,
        borderBottomWidth: 0.5,
        paddingHorizontal:5
    },
    itemContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    itemName:{
        fontWeight:'bold',
        fontSize:16
    },
    itemQty:{
        fontSize:15,
        color: Colors.GREY
    },
    itemPrice:{
        fontWeight:'bold',
        fontSize:18
    },
    otherDetailContainer:{
        paddingVertical:10,
        borderBottomColor: Colors.LIGHTER_GREY,
        borderBottomWidth: 0.5
    },
    otherDetailLabel:{
        color: Colors.GREY,
        fontWeight: 'bold',
        fontSize:16,
    },
    otherDetailText:{
        fontWeight:'100',
        fontSize:15,
        marginBottom:10
    },
    deliveryDetailContainer:{
        paddingVertical:10,
        borderBottomColor: Colors.LIGHTER_GREY,
        borderBottomWidth: 0.5
    },
    deliveryLabel:{
        fontWeight:'bold',
        color: Colors.GREY,
        fontSize:18
    },
    deliveryText:{
        fontWeight:'600',
        fontSize:18,
        color: Colors.BLACK
    },
    deliveryPersonContainer:{
        paddingVertical:10,
        borderBottomColor: Colors.LIGHTER_GREY,
        borderBottomWidth: 0.5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingRight:20,
        marginBottom:10
    },
})