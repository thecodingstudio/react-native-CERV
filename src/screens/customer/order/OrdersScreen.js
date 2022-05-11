import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';

import { Colors } from '../../../commonconfig';
import { getPostLogin, postPostLogin } from '../../../helpers/ApiHelpers';

const OrdersScreen = props => {

    const [loading, setLoading] = useState(true)
    const [state, setState] = useState('1');
    const [orders, setOrders] = useState([])
    const [length, setLength] = useState(0)

    //Current = 1
    //Past = 2

    useEffect(() => {
        getOrders()
    }, [state, loading])

    const getOrders = async () => {
        const response = await getPostLogin(`/getOrders/${state}`)
        // console.log(`\n\n${state}          \n`,response);
        if (response.success) {
            setLength(response.data.length)
            setOrders(response.data.orders)
            setLoading(false)
        } else {
            console.log(response);
            // }
        }
    }

    const cancelOrder = async(id) => {
        setLoading(true)
        const data = {
            orderId: id
        }
        const response = await postPostLogin('/cancelOrder',data)
        // console.log(response);
        if(response.success){
            Toast.show('Order cancelled successfully')
        } else {
            console.log(response);
        }   
    }

    // useEffect(() => {
    //     console.log(`\n\n${state}        \n`,orders);
    // },[orders])

    // useEffect(() => {
    //     console.log("\n\nPast Orders:         ",pastOrders);
    // },[pastOrders])


    return (
        <View style={styles.screen} >

            {/* Current / Past Button */}
            <View style={styles.currentPastButtonContainer}>
                <TouchableOpacity onPress={() => { setState('1'), setLoading(true) }} style={{ ...styles.currentPastButton, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, backgroundColor: state === '1' ? Colors.ORANGE : Colors.WHITE, borderColor: state === '1' ? Colors.ORANGE : Colors.LIGHTER_GREY }}>
                    <Text style={{ ...styles.currentPastButtonText, color: state === '1' ? Colors.WHITE : Colors.LIGHTER_GREY }}>Current Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setState('2'), setLoading(true) }} style={{ ...styles.currentPastButton, borderTopRightRadius: 5, borderBottomRightRadius: 5, backgroundColor: state === '2' ? Colors.ORANGE : Colors.WHITE, borderColor: state === '2' ? Colors.ORANGE : Colors.LIGHTER_GREY }}>
                    <Text style={{ ...styles.currentPastButtonText, color: state === '2' ? Colors.WHITE : Colors.LIGHTER_GREY }}>Past Orders</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 10, padding: 10 }}>
                {loading ?
                    (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size={65} color={Colors.ORANGE} />
                        </View>
                    )
                    :
                    length === 0 ?
                        (
                            <View>
                                <Text>No orders found</Text>
                            </View>
                        )
                        :
                        state === '1' ?
                            (
                                //Current Orders
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {orders.map(order => {
                                        // console.log(order.orderItems[0]);
                                        return (
                                            <TouchableOpacity onPress={() => {props.navigation.navigate('OrderDetail',{ orderObj: order })}} key={order.id} style={{padding:10, marginVertical:5, backgroundColor:Colors.WHITE, borderRadius:10, borderColor: Colors.GREY, borderWidth:0.5}}>
                                                {/* Caterer Info */}
                                                <View style={{flexDirection:'row', borderBottomColor: Colors.GREY, borderBottomWidth:0.5, paddingVertical:10}}>
                                                    <Image source={{uri: order.caterer.image}} style={{flex:1, aspectRatio:1}}/>
                                                    <View style={{flex:5, marginLeft:10, justifyContent:'space-evenly'}}>
                                                        <Text style={{fontWeight:'bold', fontSize:18}}>{order.caterer.store.name}</Text>
                                                        <Text>{order.caterer.store.address}</Text>
                                                    </View>
                                                </View>

                                                {/* Cart Items Details */}
                                                <View style={{borderBottomColor: Colors.GREY, borderBottomWidth:0.5, paddingVertical:10}}>
                                                    {order.orderItems.map( item => {
                                                        return (
                                                            <View key={item.id} style={{flexDirection:'row', justifyContent:'space-between'}}>
                                                                <Text style={{flex:5, fontWeight:'bold'}}>{item.item.title}</Text>
                                                                <Text style={{flex:1}}>$ {item.item.price.toFixed(2)}</Text>
                                                            </View>
                                                        )
                                                    } )}
                                                </View>

                                                {/* Other Details */} 
                                                <View style={{paddingBottom:10}}>
                                                    <Text style={styles.label}>ORDER TYPE</Text>
                                                    <Text style={styles.detail}>{order.order_type}</Text>

                                                    <Text style={styles.label}>ORDER PLACED ON</Text>
                                                    <Text style={styles.detail}>{moment(order.createdAt).format('DD MMM YYYY')} at {moment(order.createdAt).format('hh:mm A')}</Text>

                                                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                                        <View>
                                                            <Text style={styles.label}>AMOUNT</Text>
                                                            <Text style={styles.detail}>$ {order.netAmount.toFixed(2)}</Text>
                                                        </View>
                                                        {order.status < 2 ?
                                                        <TouchableOpacity onPress={() => {cancelOrder(order.id)}} style={{backgroundColor: Colors.ERROR_RED, paddingHorizontal:20, paddingVertical:10, alignItems:'center', justifyContent:'center'}}>
                                                            <Text style={{fontWeight:'bold', color: Colors.WHITE}}>Cancel Order</Text>
                                                        </TouchableOpacity> 
                                                        : 
                                                        <Text style={{color: Colors.GREEN}}>• In Progress</Text>
                                                        }
                                                    </View>
                                                </View>

                                            </TouchableOpacity>
                                        )
                                    })}
                                </ScrollView>
                            )
                            :
                            (
                                //Past Orders
                                <ScrollView>
                                    {orders.map(order => {
                                        return (
                                            <View key={order.id}>
                                                <Text>{order.id}</Text>
                                            </View>
                                        )
                                    })}
                                </ScrollView>
                            )
                }
            </View>

        </View>
    );
};

export default OrdersScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_GREY
    },
    currentPastButtonContainer: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: Colors.WHITE,
        flex: 1,
        shadowColor: Colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,

    },
    currentPastButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderWidth: 0.5
    },
    currentPastButtonText: {
        fontWeight: 'bold',
        fontSize: 15
    },
    label:{
        fontWeight:'700',
        color: Colors.GREY,
        marginTop:10
    },
    detail:{

    },
});
