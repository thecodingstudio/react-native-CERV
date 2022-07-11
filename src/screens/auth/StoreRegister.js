import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../CommonConfig'
import { Formik } from 'formik'
import * as yup from 'yup'

const StoreRegister = ({navigation, route}) => {
    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={Colors.WHITE} barStyle={'dark-content'}/>

            <Formik
                initialValues={{
                    license_num: '',
                    address:'',
                    latitude:21.000,
                    longitude:72.000,
                    bio:'',
                    order_type: 0,
                    category:''
                }}

                onSubmit={(values) => {console.log(values)}}

                validationSchema={
                    yup.object().shape({
                        license_num: yup.string().min(10, "License number should be atleast 10 digits long").max(12, "License number should be atmost 12 digits long").required('License number is mandatory.'),
                        address: yup.string().required('Address is mandatory.'),
                        bio: yup.string().required('Please add a little about your store.'),
                        category: yup.string().required('Please select atleast 1 food category'),
                        order_type: yup.number().required('Please select a type of order.')
                    })}
            >
                {({ values, errors, setFieldTouched, setFieldValue ,touched, handleChange, isValid, handleSubmit }) => (
                    <View>
                        
                    </View>
                )}
            </Formik>
            
        </View>
    )
}

export default StoreRegister

const styles = StyleSheet.create({
    screen:{
        flex:1,
    },
    title:{
        fontWeight:'bold',
        fontSize: 22
    }
})