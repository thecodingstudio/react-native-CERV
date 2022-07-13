import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../../../CommonConfig';
import { Formik } from 'formik';
import * as yup from 'yup';

const EditInformation = ({navigation, route}) => {

    const { user, mode } = route.params

    // console.log(user);

    const [loading, setLoading] = useState(false)

    const isViewMode = mode === 'view' ? true : false
    const isEditMode = mode === 'edit' ? true : false

    if(loading) {
        return(
            <View style={styles.loader}>
                <ActivityIndicator size={65} color={Colors.ORANGE} />
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            
            <View style={styles.personalContainer}>
                <View style={styles.ppContainer}>
                    <Image source={{uri: user.image}} style={{flex:1}}/>
                </View>

                <Formik
                    initialValues={{
                        name: user.name,
                        email: user.email,
                        countryCode: user.countryCode,
                        phone: user.phoneNumber,
                        orderType: user.order_type
                    }}
                >

                </Formik>
                
            </View>

        </View>
    )
}

export default EditInformation

const styles = StyleSheet.create({
    loader:{
        flex:1,
        backgroundColor: Colors.WHITE,
        justifyContent:'center',
        alignItems:'center'
    },
    screen:{
        flex:1
    },
    personalContainer:{
        backgroundColor: Colors.WHITE,
        padding:10
    },
    ppContainer:{
        alignSelf:'center',
        height: 200,
        width:200,
        borderRadius:250,
        overflow: 'hidden',
        marginBottom: 15
    },
    header:{
        fontWeight:'bold',
        fontSize:22,
        marginVertical:10
    }
})