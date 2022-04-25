import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import Caterer from '../model/caterer'
import { Colors } from '../commonconfig'

const PastOrderItem = props => {

    const orderCaterer = Caterer.find( item => { return item.id === props.catererId } )

    const items = props.items

    //Date processing
    const orderPlaceDate  = props.orderPlaceDate
    const monthNumber = orderPlaceDate.slice(0,2).replace(/^0+/, '');
    const monthNames = [ "", 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = orderPlaceDate.slice(3,5)
    const year = "20" + orderPlaceDate.slice(6,8)
    const orderDate = date + " " + monthNames[monthNumber] + " " + year

    const orderPlaceTime = props.orderPlaceTime
    const hour = orderPlaceTime.slice(0,2)
    const ampm = hour >=12 ? ' PM' : ' AM'
    const minutes = orderPlaceTime.slice(3,5)
    const hour1 = hour%12 === 0 ? '12' : hour%12
    const hour12 = hour1 < 10 ? '0' + hour1 : hour1
    const orderTime = hour12 + ":" + minutes + ampm 

    return (
        <View style={styles.orderItemContainer}>

            {/* Caterer */}
            <View style={styles.catererContainer}>
                <Image source={{uri : orderCaterer.image}} style={styles.catererImage}/>
                <View style={{paddingHorizontal:10, justifyContent:'space-evenly', flex: 4}}>
                    <Text style={styles.catererName} numberOfLines={1} ellipsizeMode="tail">{orderCaterer.name}</Text>
                    <Text style={styles.catererAddress} numberOfLines={1} ellipsizeMode="tail">{orderCaterer.address}</Text>
                </View>
            </View>

            {/* Items total */}
            <View style={styles.itemsContainer}>
                <Text style={styles.label}>ORDER SUMMARY</Text>
                {items.map( item => {
                    return (
                        <View key={item.id} style={styles.itemRow}>
                            <Text>{item.name}</Text>
                            <Text style={{fontWeight:'900'}}>$ {item.itemTotal.toFixed(2)}</Text>
                        </View>
                    )
                } )}
            </View>

            <View style={styles.detailContainer}>
                <Text style={styles.label}>ORDER PLACED ON</Text>
                <View style={{flexDirection:'row', alignItems:'flex-start', justifyContent:'flex-start'}}>
                    <Text style={{...styles.detail, fontWeight:'bold'}}>{orderDate} </Text>
                    <Text> at  </Text>
                    <Text style={{...styles.detail, fontWeight:'bold'}}>{orderTime}</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <View>
                        <Text style={styles.label}>TOTAL</Text>
                        <Text style={styles.detail}>$ {props.totalAmount.toFixed(2)}</Text>
                    </View>
                </View>
            </View>

            {/* Order Status ( Rejected / Completed / Cancelled) */}
            <View>
                <Text style={{ color : props.orderStatus === 4 ? Colors.GREEN : Colors.ERROR_RED } }>•  {props.orderStatusText}</Text>
            </View>

        </View>
    )
}

export default PastOrderItem

const styles = StyleSheet.create({
    orderItemContainer:{
        flex: 0.5
    },
    catererContainer:{
        flexDirection:'row',
        width:'100%',
        paddingVertical:10,
        borderBottomColor: Colors.LIGHTER_GREY,
        borderBottomWidth: 1
    },
    catererImage:{
        flex: 1,
        aspectRatio: 1
    },
    catererName:{
        fontWeight:'bold',
        fontSize:20
    },
    catererAddress:{
        fontSize: 16 ,
        fontWeight:'900'
    },
    itemsContainer:{
        paddingVertical:10,
        width:'100%',
        borderBottomColor: Colors.LIGHTER_GREY,
        borderBottomWidth: 1,
    },
    itemRow:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10
    },
    detailContainer:{
        paddingVertical: 10
    },
    label:{
        fontWeight:'bold',
        color: Colors.GREY,
        marginBottom: 10,
        fontSize:16
    },
    detail:{
        fontWeight:'600',
        fontSize:15,
        marginBottom:10
    },
    cancelButton:{
        backgroundColor:Colors.ERROR_RED,
        padding:10,
        marginRight: 10
    },
    cancelText:{
        color: Colors.WHITE,
        fontWeight:'bold',
        fontSize: 15
    }})