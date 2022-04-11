import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../../commonconfig';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import * as addressActions from '../../../../store/actions/address';
import addressIcon from '../../../../model/addressIcon';
import Ionicon from 'react-native-vector-icons/Ionicons';

const AddAddress = props => {
    const dispatch = useDispatch();
    return (
        <View style={styles.screen}>

            <Formik
                initialValues={{
                    tag:'',
                    address:'',
                    icon:''
                }}
                onSubmit = { values => {
                    dispatch(addressActions.addAddress(values))
                    props.navigation.navigate('SavedAddresses');
                }}
                validationSchema={ yup.object().shape({
                    tag: yup.string().required('Address Tag is required.').max(15,'Tag cannot be more than 15 characters long.'),
                    address: yup.string().required('Address is required.'),
                    icon: yup.string().required('Icon is required.'),
                }) }
            >
                { ({ values, errors, setFieldTouched, touched, handleChange, setFieldValue ,isValid, handleSubmit }) => (
                    <View>
                        
                        <Text style={styles.title}>TAG</Text>
                        <View style={styles.container}>
                            <TextInput 
                                value={values.tag}
                                onBlur={ () => setFieldTouched('tag')}
                                onChangeText={handleChange('tag')}
                                placeholder="Enter a tag"
                                keyboardType='default'
                                maxLength={15}
                            />
                        </View>
                        {touched.tag && errors.tag && 
                            <Text style={{ fontSize: 11, color: Colors.ERROR_RED , margin:10 }} >{errors.tag}</Text>
                        }

                        <Text style={styles.title}>ADDRESS</Text>
                        <View style={styles.container}>
                            <TextInput 
                                value={values.address}
                                onBlur={ () => setFieldTouched('address')}
                                onChangeText={handleChange('address')}
                                placeholder="Enter address"
                                keyboardType='default'
                            />
                        </View>
                        {touched.address && errors.address && 
                            <Text style={{ fontSize: 11, color: Colors.ERROR_RED , margin:10 }} >{errors.address}</Text>
                        }
                        

                        <Text style={styles.title}>ICON</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{flexDirection:'row'}}> 
                            {addressIcon.map( (item,index) => {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity style={{...styles.iconContainer, borderColor: values.icon === item.name ? Colors.ORANGE : Colors.LIGHTER_GREY}} onPress={ () => setFieldValue('icon', item.name) }>
                                            <Ionicon name={item.name} size={25} color={Colors.GREY}/>
                                        </TouchableOpacity>
                                    </View>
                                )
                            } )}
                        </View>
                        {touched.icon && errors.icon && 
                            <Text style={{ fontSize: 11, color: Colors.ERROR_RED , margin:10 }} >{errors.icon}</Text>
                        }
                        </ScrollView>

                        <TouchableOpacity style={styles.addContainer} onPress={handleSubmit} disabled={!isValid}>
                            <Text style={styles.add}>ADD</Text>
                        </TouchableOpacity>

                    </View>
                ) }
            </Formik>

        </View>
  )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor: Colors.WHITE,
        padding:20
    },
    title:{
        fontSize:18,
        fontWeight:'700',
        color:'#999',
        marginTop:15
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
    iconContainer:{
        height:50,
        width:50,
        borderRadius:25,
        borderWidth:2, 
        alignItems:'center',
        justifyContent:'center',
        margin: 5
    },
    add:{
        fontWeight:'bold',
        fontSize:20,
        color: Colors.WHITE
    },
    addContainer:{
        padding:20,
        alignItems:'center',
        backgroundColor: Colors.ORANGE,
        borderRadius:5,
        marginTop:25
    }
})

export default AddAddress