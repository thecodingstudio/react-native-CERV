import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions, Modal } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../../../CommonConfig';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker';

const DishDetailScreen = ({route, navigation}) => {

    const { selectedDish, mode, category } = route.params

    const isViewMode = mode ==='view' ? true : false
    const isAddMode = mode ==='add' ? true : false
    const isEditMode = mode === 'edit' ? true : false

    const [selectedImage, setSelectedImage] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [showError, setShowError ] = useState(false)

    const takeFromCamera = () => {
        ImagePicker.openCamera({
            width: Dimensions.get('screen').width,
            height: 200,
            cropping: true,
        }).then(image => {
            // dispatch(registerActions.addImage(image))
            setSelectedImage(image)
            setModalVisible(!modalVisible)
        });
    }

    const pickFromGallery = () => {
        ImagePicker.openPicker({
            width: Dimensions.get('screen').width,
            height: 200,
            cropping: true
        }).then(image => {
            // dispatch(registerActions.addImage(image))
            setSelectedImage(image)
            setModalVisible(!modalVisible)
        });
    }

    const addDish = async(values) => {
        console.log("Add Mode: \n\n",values);
    }

    const editDish = async(values) => {
        console.log("Edit Mode: \n\n",values);
    }

    return (
        <View style={styles.screen}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Choose option: </Text>
                        <TouchableOpacity
                            style={[styles.buttonModal, styles.buttonClose]}
                            onPress={pickFromGallery}
                        >
                            <Text style={styles.textStyle}>Choose from gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttonModal, styles.buttonClose]}
                            onPress={takeFromCamera}
                        >
                            <Text style={styles.textStyle}>Use Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttonModal, styles.buttonClose]}
                            onPress={() => { setModalVisible(false) }}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Text style={styles.label}>Product Photo</Text>
            <View style={styles.imageContainer}>
                {(isEditMode || isViewMode) && <Image source={{uri: selectedImage ? selectedImage.path : selectedDish.image}} style={{height:'100%', width:'100%'}} resizeMode={'cover'}/>}
                {isAddMode && <Image source={{uri: selectedImage?.path }} style={{height:'100%', width:'100%'}} resizeMode={'cover'}/>}
                {(isEditMode || isAddMode) && <TouchableOpacity style={styles.cameraBtn} onPress={() => {setModalVisible(true)}}>
                    <Ionicons name={'camera'} size={25} color={Colors.WHITE}/>
                </TouchableOpacity>}
            </View>
            { isAddMode && !selectedImage && showError && <Text style={{ fontSize: 11, color: Colors.ERROR_RED, margin: 10 }}>Please select an image for the dish</Text> }

            <Formik
                initialValues={{
                    dishName: isAddMode ? "" : selectedDish.title,
                    price: isAddMode ? "" : (selectedDish.price).toFixed(2),
                    description: isAddMode ? "" : selectedDish.description
                }} 

                onSubmit={(values) => { 
                    if(isEditMode){ 
                        editDish({...values, selectedImage: selectedImage ? selectedImage : null, id: selectedDish.id})
                    } else if(isAddMode) {
                        if(!selectedImage) {
                            setShowError(true)
                        } else {
                            setShowError(false)
                            addDish({...values, selectedImage: selectedImage , categoryId: category.id})
                        }
                    }
                }}

                validationSchema={
                    isAddMode ? 
                    yup.object().shape({
                        dishName: yup.string().required("Name of dish is required!"),
                        price: yup.number().positive("Price cannot be negative!").required("Price of dish is required!"),
                        description: yup.string().max(500, "Description too long!").min(10, "Description must be atleast 10 characters long!").required("Description is required!")
                    })
                    :
                    yup.object().shape({
                        dishName: yup.string(),
                        price: yup.number().positive("Price cannot be negative!"),
                        description: yup.string().max(500, "Description too long!").min(10, "Description must be atleast 10 characters long!")
                    })
                }
            >
                {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                    <KeyboardAwareScrollView>
                        <View>
                            <Text style={styles.label}>Category Name</Text>
                            <View style={styles.container}>
                                <TextInput
                                    value={isAddMode ? category.title : selectedDish.categoryName}
                                    editable={ false }
                                    style={{ flex: 1, color: Colors.BLACK, fontSize:16, fontWeight:'bold' }}
                                />
                            </View>

                            <Text style={styles.label}>Dish Name</Text>
                            <View style={styles.container}>
                                <TextInput
                                    value={values.dishName}
                                    editable={ !isViewMode || isEditMode || isAddMode}
                                    onBlur={() => setFieldTouched('dishName')}
                                    onChangeText={handleChange('dishName')}
                                    keyboardType={'default'}
                                    style={{ flex: 1, color: Colors.BLACK, fontSize:16, fontWeight:'bold' }}
                                />
                            </View>
                            {touched.dishName && errors.dishName &&
                                <Text style={{ fontSize: 11, color: Colors.ERROR_RED, margin: 10 }}>{errors.dishName}</Text>
                            }

                            <Text style={styles.label}>Description</Text>
                            <View style={styles.container}>
                                <TextInput
                                    value={values.description}
                                    editable={ !isViewMode || isEditMode || isAddMode }
                                    onBlur={() => setFieldTouched('description')}
                                    onChangeText={handleChange('description')}
                                    keyboardType={'default'}
                                    style={{ flex: 1, color: Colors.BLACK, fontSize:16, fontWeight:'bold' }}
                                />
                            </View>
                            {touched.description && errors.description &&
                                <Text style={{ fontSize: 11, color: Colors.ERROR_RED, margin: 10 }}>{errors.description}</Text>
                            }

                            <Text style={styles.label}>Price</Text>
                            <View style={styles.container}>
                                <TextInput
                                    value={(values.price).toString()}
                                    editable={ !isViewMode || isEditMode || isAddMode}
                                    onBlur={() => setFieldTouched('price')}
                                    onChangeText={handleChange('price')}
                                    keyboardType={'number-pad'}
                                    style={{ flex: 1, color: Colors.BLACK, fontSize:16, fontWeight:'bold' }}
                                />
                            </View>
                            {touched.price && errors.price &&
                                <Text style={{ fontSize: 11, color: Colors.ERROR_RED, margin: 10 }}>{errors.price}</Text>
                            }
                        </View>

                        {isEditMode && 
                            <TouchableOpacity style={styles.editBtn} onPress={handleSubmit}>
                                <Text style={styles.btnText}>Save</Text>
                            </TouchableOpacity>
                        }

                        {isAddMode && 
                            <TouchableOpacity style={styles.editBtn} onPress={handleSubmit}>
                                <Text style={styles.btnText}>Add Dish</Text>
                            </TouchableOpacity>
                        }

                    </KeyboardAwareScrollView>
                )}
            </Formik>

            {isViewMode && 
                <TouchableOpacity style={styles.viewBtn} onPress={() => {navigation.push('DishDetail',{ selectedDish, mode:'edit' })}}>
                    <Text style={styles.btnText}>Edit Details</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default DishDetailScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor: Colors.WHITE,
        padding:10
    },
    label:{
        fontWeight:'bold',
        fontSize:18,
        color: Colors.GREY,
        marginTop: 10
    },
    container: {
        flexDirection: 'row',
        borderBottomColor: Colors.GREY,
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginVertical: 10
    },
    imageContainer:{
        alignSelf:'center', 
        width: '90%', 
        height: 150, 
        overflow:'hidden', 
        borderRadius:10, 
        marginVertical:10
    },
    viewBtn:{
        paddingVertical:15,
        width:'90%',
        alignSelf:'center',
        backgroundColor: Colors.ORANGE,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        position:'absolute',
        bottom:10
    },
    editBtn:{
        paddingVertical:15,
        width:'90%',
        alignSelf:'center',
        backgroundColor: Colors.ORANGE,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
    },
    btnText:{
        fontWeight:'bold',
        fontSize:18,
        color: Colors.WHITE
    },
    cameraBtn:{
        backgroundColor: Colors.ORANGE, 
        height:40, 
        width:40, 
        alignItems:'center', 
        justifyContent:'center',
        borderRadius:40,
        position:'absolute',
        right:5,
        top:5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 5,
        width: 200
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: Colors.ORANGE,
    },
    textStyle: {
        color: Colors.WHITE,
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 20
    },
})