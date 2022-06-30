import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../../CommonConfig';
import { getPostLogin } from '../../../../helpers/ApiHelpers';
import moment from 'moment';

const OrdersScreen = () => {

    const [loading, setLoading] = useState(true)
    const [state, setState] = useState('1');
    const [orders, setOrders] = useState([])
    const [length, setLength] = useState(0)

    useEffect( () => {
        getOrders()
    },[state,loading])

    const getOrders = async() => {
        const response = await getPostLogin(`/caterer/getOrders/${state}`)
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

    return (
        <View style={styles.screen}>

            {/* Current / Past Button */}
            <View style={styles.currentPastButtonContainer}>
                <TouchableOpacity onPress={() => { setState('1'), setLoading(true) }} style={{ ...styles.currentPastButton, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, backgroundColor: state === '1' ? Colors.ORANGE : Colors.WHITE, borderColor: state === '1' ? Colors.ORANGE : Colors.LIGHTER_GREY }}>
                    <Text style={{ ...styles.currentPastButtonText, color: state === '1' ? Colors.WHITE : Colors.LIGHTER_GREY }}>Current Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setState('2'), setLoading(true) }} style={{ ...styles.currentPastButton, borderTopRightRadius: 5, borderBottomRightRadius: 5, backgroundColor: state === '2' ? Colors.ORANGE : Colors.WHITE, borderColor: state === '2' ? Colors.ORANGE : Colors.LIGHTER_GREY }}>
                    <Text style={{ ...styles.currentPastButtonText, color: state === '2' ? Colors.WHITE : Colors.LIGHTER_GREY }}>Past Orders</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 10 }}>
                {loading ? 
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={65} color={Colors.ORANGE} />
                    </View>
                    :
                    length <= 0 ?
                        <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
                            <Text>No Orders Yet!</Text>
                        </View>
                        :
                        state === '1' ?
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {orders.map( order => {
                                    return(
                                        <TouchableOpacity key={order.id} style={styles.currentOrderItemContainer}>

                                            <View style={{height:75, width:'100%', flexDirection:'row'}}>
                                                <Image source={{uri: order.user.image}} style={{height: '100%', aspectRatio:1}}/>
                                                <View style={{height:'100%', justifyContent:'space-evenly', marginLeft: 10}}>
                                                    <Text style={{fontWeight:'bold', fontSize:18}}>{order.user.name}</Text>
                                                    <Text>{order.address.address}</Text>
                                                    <Text>{moment(order.date).format('DD/MM/YYYY')}</Text>
                                                </View>
                                            </View>
                                            <View style={{height:0 , width:'100%', borderWidth:0.25, borderColor: Colors.LIGHTER_GREY, marginVertical: 10}} />
                                            {order.orderItems.map( item => {
                                                return(
                                                    <View key={item.id} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                                        <Text style={{flex:5}}>{item.item.title}</Text>
                                                        <Text style={{flex:1}}>$ {item.itemTotal}</Text>
                                                    </View>
                                                )
                                            } )}
                                            <View style={{height:0 , width:'100%', borderWidth:0.25, borderColor: Colors.LIGHTER_GREY, marginVertical: 10}} />
                                        
                                        </TouchableOpacity>
                                    )
                                } )}
                            </ScrollView>
                            :
                            <View>
                                <Text>Past Orders</Text>
                            </View>
                }
            </View>

        </View>
    )
}

export default OrdersScreen

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
    currentOrderItemContainer:{
        padding:10
    }
})