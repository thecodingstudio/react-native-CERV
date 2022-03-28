import React from "react";
import { Text, View, TextInput, StyleSheet, Image } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Formik } from 'formik';
import * as yup from 'yup';

import Colors from "../../../../constants/Colors";

const AddCard = props => {
    return(
        <KeyboardAwareScrollView>
            <View style={styles.screen} > 

                {/* Card Logos */}
                <View style={{flexDirection:"row", justifyContent:'space-evenly'}} >

                    <Image source={require('../../../../assets/Icons/icons8-visa-100.png')} style={{height:75, width:75}} />
                    <Image source={require('../../../../assets/Icons/icons8-mastercard-100.png')} style={{height:75, width:75}} />
                    <Image source={require('../../../../assets/Icons/icons8-american-express-100.png')} style={{height:75, width:75}} />

                </View>
                
                <Formik
                    initialValues={{
                        cardNumber : '',
                        expiryDate : '',
                        cvv : '',
                        name : ''
                    }}

                    onSubmit={values => {
                        console.log(JSON.stringify(values))
                        props.navigation.goBack();
                    }}

                    validationSchema={yup.object().shape({
                        cardNumber: yup.number()
                        .positive("Card Number cannot be negative!")
                        .integer("Card Number cannot have decimals or hyphens")
                        .moreThan(999999999999999, "The card number must be 16 digits long")
                        .required("Card Number is required!"),

                        expiryDate: yup.date()
                        .required("Expiry Date is required."),

                        cvv: yup.number()
                        .positive('CVV cannot be negative!')
                        .integer("CVV cannot contain decimals.")
                        .moreThan(99,"CVV must be 3 digits long")
                        .lessThan(1000,"CVV must be 3 digit long")
                        .required("CVV is required."),

                        name: yup.string()
                        .required("Name is required.")
                    })}
                >
                    { ({values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit}) => (
                        <View>

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
                                <Text style={{ fontSize: 11, color: 'red', margin:10 }} >{errors.cardNumber}</Text>
                            }

                            {/* EXPIRY & CVV */}
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:0.6,marginHorizontal:5}}>
                                    {/* Expiry Date */}
                                    <Text style={styles.title}>EXPIRY DATE</Text>
                                    <View style={styles.container}>
                                        <TextInput 
                                            value={values.expiryDate}
                                            onBlur={ () => setFieldTouched('expiryDate')}
                                            onChangeText={handleChange('expiryDate')}
                                            placeholder="Enter Expiry Date"
                                            keyboardType="numbers-and-punctuation"
                                        />
                                        {touched.expiryDate ? (!errors.expiryDate ? <Animatable.View animation="bounceIn" ><Feather name="check-circle" color="green" size={20}/></Animatable.View> : null) : null}
                                    </View>
                                    {touched.expiryDate && errors.expiryDate && 
                                        <Text style={{ fontSize: 11, color: 'red', margin:10 }} >{errors.expiryDate}</Text>
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
                                        <Text style={{ fontSize: 11, color: 'red', margin:10 }} >{errors.cvv}</Text>
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
                                <Text style={{ fontSize: 11, color: 'red', margin:10 }} >{errors.name}</Text>
                            }

                            {/* CONFIRM BUTTON */}
                            <TouchableOpacity onPress={ isValid ? handleSubmit : ()=>{} } >
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Confirm</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) } 
                    
                </Formik>
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
        borderColor:'black', 
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
        backgroundColor: Colors.orange,
        borderRadius: 10,
        marginTop:50
    },
    buttonText:{
        fontSize:20,
        color:'white',
        fontWeight:'700'
    }
});

export default AddCard;