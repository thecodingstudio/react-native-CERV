import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Image } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import { useDispatch } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import * as paymentActions from '../../../../store/actions/paymentMethod';
import OtherPaymentTypeValidationSchema from '../../../../schema/OtherPaymentTypeValidationSchema';
import CreditCardValidationSchema from "../../../../schema/CreditCardValidationSchema";
import{ Colors, Images }from '../../../../commonconfig'

const AddCard = props => {
    const [type, setType]= useState('card');

    const dispatch = useDispatch();

    // EXPIRY DATE MODAL LOGIC
    const initialDate = new Date()
    const [month, year] = [initialDate.getMonth(), initialDate.getFullYear()];
    const mon = ((month+1) < 10 ? '0': '' ) + (month+1)
    const dateString =  mon + "/" + (year-2000);
    let selectedExpiryDateString; // state define karo
    console.log(dateString)

    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    };
    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };
    const handleDateConfirm = (date) => {
        const [month, day, year]  = [date.getMonth(), date.getFullYear()];
        
        setInitialDate( selectedDateStr ); // selectedexpirydatestring state
        hideDatePicker();
    };

    return(
        <KeyboardAwareScrollView>
            <View style={styles.screen} > 
                <Text style={styles.title}>SELECT TYPE</Text>
                
                {/* Card Logos */}
                <TouchableOpacity onPress={() => { setType('card')}} style={{borderWidth:1, borderRadius:10, marginTop:10, paddingHorizontal:10, paddingTop:5, paddingBottom:15}} >
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>
                        <Text style={styles.title}>CARDS</Text>
                        {type === 'card' ? <Ionicon name="checkmark-circle" size={25} color={Colors.GREEN}/> : null}
                    </View>
                    <View style={{flexDirection:"row", justifyContent:'space-evenly', marginTop:5}} >
                        <Image source={Images.VISA} style={{height:75, width:75}} />
                        <Image source={Images.MASTERCARD} style={{height:75, width:75}} />
                        <Image source={Images.AMERICAN_EXPRESS} style={{height:75, width:75}} />
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => { setType('other')}} style={{borderWidth:1, borderRadius:10, marginTop:10, paddingHorizontal:10, paddingTop:5, paddingBottom:15}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>
                            <Text style={styles.title}>OTHER</Text>
                            {type === 'other' ? <Ionicon name="checkmark-circle" size={25} color={Colors.GREEN}/> : null}
                        </View>
                    <View style={{flexDirection:"row", justifyContent:'space-evenly', marginTop:5}} >
                        <Image source={Images.GOOGLE_PAY} style={{height:75, width:75}} />
                        <Image source={Images.APPLE_PAY} style={{height:75, width:75}} />
                    </View>
                </TouchableOpacity>
                
                { type === 'card' ?
                <Formik
                    initialValues={{
                        cardNumber : '',
                        expiryDate : '',
                        cvv : '',
                        name : ''
                    }}

                    onSubmit={values => {
                        const cardValues = {...values, paymentType:'card'}
                        dispatch(paymentActions.addCard(cardValues))
                        props.navigation.goBack();
                    }}

                    validationSchema={CreditCardValidationSchema}
                >
                    { ({values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit}) => (
                        <View style={{marginTop:30}}>

                            {/* Card Number */}
                            <Text style={styles.title}>CARD NUMBER</Text>
                            <View style={styles.container}>
                                <TextInput 
                                    value={values.cardNumber}
                                    onBlur={ () => setFieldTouched('cardNumber')}
                                    onChangeText={handleChange('cardNumber')}
                                    placeholder="Enter card number"
                                    keyboardType='number-pad'
                                    maxLength={16}
                                />
                                {touched.cardNumber ? (!errors.cardNumber ? <Animatable.View animation="bounceIn" ><Feather name="check-circle" color="green" size={20}/></Animatable.View> : null) : null}
                            </View>
                            {touched.cardNumber && errors.cardNumber && 
                                <Text style={{ fontSize: 11, color: Colors.ERROR_RED , margin:10 }} >{errors.cardNumber}</Text>
                            }

                            {/* EXPIRY & CVV */}
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:0.6,marginHorizontal:5}}>
                                    {/* Expiry Date */}
                                    <Text style={styles.title}>EXPIRY DATE</Text>
                                    <View style={styles.container}>
                                        <TouchableOpacity>
                                            <View style={styles.dateTimeModalContainer}>
                                                <Text style={styles.timeDate}>{initialDate}</Text>
                                                <Ionicon name="calendar" size={30} color={Colors.ORANGE}/>
                                            </View>
                                            <DateTimePickerModal
                                                isVisible={isDatePickerVisible}
                                                mode="date"
                                                onConfirm={handleDateConfirm}
                                                onCancel={hideDatePicker}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {touched.expiryDate && errors.expiryDate && 
                                        <Text style={{ fontSize: 11, color: Colors.ERROR_RED, margin:10 }} >{errors.expiryDate}</Text>
                                    }
                                </View>

                                <View style={{flex:0.4,marginHorizontal:5}}>
                                    {/* CVV */}
                                    <Text style={styles.title}>CVV</Text>
                                    <View style={styles.container}>
                                        <TextInput 
                                            value={values.cvv}
                                            onBlur={ () => setFieldTouched('cvv')}
                                            onChangeText={handleChange('cvv')}
                                            placeholder="Enter CVV"
                                            secureTextEntry={true}
                                            maxLength={3}
                                            keyboardType="number-pad"
                                        />
                                        {touched.cvv ? (!errors.cvv ? <Animatable.View animation="bounceIn" ><Feather name="check-circle" color="green" size={20}/></Animatable.View> : null) : null}
                                    </View>
                                    {touched.cvv && errors.cvv && 
                                        <Text style={{ fontSize: 11, color: Colors.ERROR_RED, margin:10 }} >{errors.cvv}</Text>
                                    }
                                </View>
                            </View>

                            {/* Cardholder Name */}
                            <Text style={styles.title}>CARDHOLDER'S NAME</Text>
                            <View style={styles.container}>
                                <TextInput 
                                    value={values.name}
                                    onBlur={ () => setFieldTouched('name')}
                                    onChangeText={handleChange('name')}
                                    placeholder="Enter your name"
                                />
                                {touched.name ? (!errors.name ? <Animatable.View animation="bounceIn" ><Feather name="check-circle" color="green" size={20}/></Animatable.View> : null): null}
                            </View>
                            {touched.name && errors.name && 
                                <Text style={{ fontSize: 11, color: Colors.ERROR_RED, margin:10 }} >{errors.name}</Text>
                            }

                            {/* CONFIRM BUTTON */}
                            <TouchableOpacity onPress={ handleSubmit} disabled={!isValid}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Confirm</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) } 
                    
                </Formik>
                :
                <Formik
                    initialValues={{
                        id:'',
                        type:''
                    }}

                    onSubmit={values => {
                        const otherValues = {...values, paymentType:'other'}
                        dispatch(paymentActions.addOther(otherValues))
                        props.navigation.goBack();
                    }}

                    validationSchema={OtherPaymentTypeValidationSchema}
                >
                    { ({values, errors, setFieldTouched, touched, handleChange, setFieldValue, isValid, handleSubmit}) => (
                        <View style={{marginTop:30}}>

                            {/* ID*/}
                            <Text style={styles.title}>ID</Text>
                            <View style={styles.container}>
                                <TextInput 
                                    onBlur={ () => setFieldTouched('id')}
                                    onChangeText={handleChange('id')}
                                    placeholder="Enter ID"
                                    keyboardType='default'
                                />
                                {touched.id ? (!errors.id ? <Animatable.View animation="bounceIn" ><Feather name="check-circle" color="green" size={20}/></Animatable.View> : null) : null}
                            </View>
                            {touched.id && errors.id && 
                                <Text style={{ fontSize: 11, color: Colors.ERROR_RED , margin:10 }} >{errors.id}</Text>
                            }

                            {/* TYPE ( GPAY / APPLEPAY) */}
                            <Text style={styles.title}>TYPE</Text>
                            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                                {/* GPAY */}
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity style={{alignItems:'center',justifyContent:'center', padding:10,borderRadius:50, borderWidth:1, borderColor: values.type === 'gpay' ? Colors.BLACK : 'transparent'}} onPress={ () => setFieldValue('type', 'gpay') }>
                                        <Image source={Images.GOOGLE_PAY} style={{height:75, width:75}} />
                                    </TouchableOpacity>
                                </View>

                                {/* GPAY */}
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity style={{alignItems:'center',justifyContent:'center', padding:10,borderRadius:50, borderWidth:1, borderColor: values.type === 'applepay' ? Colors.BLACK : 'transparent'}} onPress={ () => setFieldValue('type', 'applepay') }>
                                        <Image source={Images.APPLE_PAY} style={{height:75, width:75}} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            
                            {/* CONFIRM BUTTON */}
                            <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Confirm</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) } 
                    
                </Formik>
            }
            </View>
        </KeyboardAwareScrollView>
    )
};

const styles = StyleSheet.create({
    screen:{
        padding:20
    },
    title:{
        fontSize:18,
        fontWeight:'700',
        color:'#999',
        marginTop:10
    },
    container:{
        flexDirection:'row', 
        borderColor:Colors.BLACK, 
        borderWidth:1, 
        justifyContent:'space-between', 
        padding:15, 
        borderRadius:5, 
        marginTop:10
    },
    button:{
        alignItems:'center',
        justifyContent:'center',
        height: 50,
        backgroundColor: Colors.ORANGE,
        borderRadius: 10,
        marginTop:50
    },
    buttonText:{
        fontSize:20,
        color:Colors.WHITE,
        fontWeight:'700'
    }
});

export default AddCard;