import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'; 
import Ionicon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Caterer from '../../../model/caterer';
import Colors from '../../../constants/Colors';

const DetailScreen = props => {

    const catererId = props.route.params.catererId;
    const selectedCaterer = Caterer.find(caterer => { return(caterer.id === catererId) });

    const Stars = props => {
        let rating = props.rating;
        let disp = []

        for (var i = 1; i <= 5; i++) {
            let star = <Ionicon name="star" size={18} color="#F0E010" key={i}/>
            if (i > rating) {
                star = <Ionicon name="star-outline" size={18} color="grey" key={i}/>
            }
            disp.push(star);
        }

        return (<View style={{ flexDirection: 'row' }} >{disp}</View>)

    }

    const dummyDateTimeObject = new Date("2022-01-01");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [month, day, year] = [dummyDateTimeObject.getMonth(), dummyDateTimeObject.getDate(), dummyDateTimeObject.getFullYear()];
    const [hour, minutes] = [dummyDateTimeObject.getHours(), dummyDateTimeObject.getMinutes()];
    const ampm = hour>=12 ? 'PM' : 'AM'

    const dateString = day + " " + monthNames[month] + " " + year;
    const timeString = hour + ":" + minutes + " " +ampm
    
    const [initialDate, setInitialDate] = useState(dateString);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    };
    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };
    const handleConfirm = (date) => {
        const [month, day, year]  = [date.getMonth(), date.getDate(), date.getFullYear()];
        const selectedDateStr = day + " " + monthNames[month] + " " + year;
        setInitialDate( selectedDateStr );
        hideDatePicker();
    };

    const [initialTime, setInitialTime] = useState(timeString);
    const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
    const showTimePicker = () => {
        setIsTimePickerVisible(true);
    };
    const hideTimePicker = () => {
        setIsTimePickerVisible(false);
    };
    const handleTimeConfirm = (date) => {
        const [hour, minutes] = [date.getHours(), (date.getMinutes()<10?'0':'') + date.getMinutes()];
        const ampm = hour>=12 ? 'PM' : 'AM'
        const selectedTimeStr = hour + ":" + minutes + " " +ampm;
        setInitialTime(selectedTimeStr)
        hideTimePicker();
    };

    return (
        <View style={{flex:1}}>
            <View style={{flex:0.93}}>
            <ScrollView>
                {/* Caterer Details */}
                <View style={styles.screen}>
                    <Image source={{uri:selectedCaterer.image}} style={styles.image}/>
                    <Text style={styles.name}>{selectedCaterer.name}</Text>
                    <Text style={styles.address}>{selectedCaterer.address}</Text>
                    <View style={{ marginTop: 3 }} >
                        <Stars rating={selectedCaterer.rating} />
                    </View>
                </View>

                {/* Date & Time */}
                <View style={styles.dateTimeContainer}>
                    <Text style={styles.label}>Date and Time</Text>
                    <View style={{flexDirection:'row',width:'100%',height:60, justifyContent:'space-between',alignItems:'center', marginVertical:10}}>

                        <TouchableOpacity onPress={showDatePicker} style={{width:'48%'}}>
                            <View style={{ flex:1,borderColor:'#ccc', borderWidth:1, flexDirection:'row',alignItems:'center', justifyContent:'space-between', paddingHorizontal:10,borderRadius:10}}>
                                <Text style={styles.timeDate}>{initialDate}</Text>
                                <Ionicon name="calendar" size={30} color={Colors.orange}/>
                            </View>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={showTimePicker} style={{width:'48%'}}>
                            <View style={{ flex:1,borderColor:'#ccc', borderWidth:1, flexDirection:'row',alignItems:'center', justifyContent:'space-between',paddingHorizontal:10,borderRadius:10}}>
                                <Text style={styles.timeDate}>{initialTime}</Text>
                                <Ionicon name="time-outline" size={30} color={Colors.orange}/>
                            </View>
                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="time"
                                onConfirm={handleTimeConfirm}
                                onCancel={hideTimePicker}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Category, Bio */}
                <View style={styles.screen}>
                    <View style={styles.food_category}>
                        <Text style={styles.label}>Food Category</Text>
                        <Text style={{marginTop:10, color:'black', fontWeight:'bold', fontSize:18}}>{selectedCaterer.food_category}</Text>
                    </View>
                    <Text style={styles.label}>Bio</Text>
                    <Text style={{marginTop:10, color:'black', fontWeight:'bold', fontSize:18}}>{selectedCaterer.bio}</Text>
                </View>

                {/* Order Type */}
                <View style={styles.dateTimeContainer}>
                    <Text style={styles.label} >Order Type</Text>
                    
                    {/* Options */}
                    <View style={{flexDirection:'row'}}>
                        
                        {/* Delivery */}
                        <View>
                            
                        </View>
                        {/* Pick Up */}
                        <View>

                        </View>

                    </View>

                </View>
                

            </ScrollView>
            </View>

            {/* Footer */}
            <View style={{flex:0.07,width:'100%', backgroundColor: Colors.orange, paddingVertical:10}}>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        paddingHorizontal:20,
        paddingVertical:20,
        borderBottomColor:'#ddd',
        borderBottomWidth:1
    },
    image:{
        height:200, 
        width:'100%',
        borderRadius:10
    },
    label:{
        fontWeight:'bold',
        fontSize:17,
        color:'#aaa'
    },
    name:{
        fontWeight:'bold',
        fontSize:20,
        marginTop:10
    },
    address:{
        fontWeight:'bold',
        fontSize:17,
        color:'#444',
        marginTop:5
    },
    dateTimeContainer:{
        paddingHorizontal:20,
        paddingVertical:10,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        height:110
    },
    food_category:{
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        paddingBottom:10,
        marginBottom:5
    },
    timeDate:{
        color:'black', 
        fontWeight:'bold', 
        fontSize:18
    }

});

export default DetailScreen;