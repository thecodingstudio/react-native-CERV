import { ActivityIndicator, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getPostLogin } from '../../../../helpers/ApiHelpers'
import { Colors } from '../../../../CommonConfig'
import Ionicons from 'react-native-vector-icons/Ionicons';

const MenuScreen = ({navigation}) => {
    const [ loading, setLoading ] = useState(true)
    const [ categories, setCategories ] = useState([])

    useEffect(() => {
        const refresh = navigation.addListener('focus', () => {
            setLoading(true)
            getCategories()
        })

        return refresh
    },[navigation])

    const getCategories = async() => {
        const categoriesResponse = await getPostLogin('/caterer/categories')
        // console.log(categoriesResponse);
        if(categoriesResponse.success) {
            setCategories(categoriesResponse.data.categories)
            setLoading(false)
        } else {
            console.log(categoriesResponse);
            setLoading(false)
        }
    }

    const renderCategoryItem = ({item}) => {
        return(
            <View style={styles.categoryItem}>
                {/* Image & Title */}
                <View style={{flex:6,flexDirection:'row', alignItems:'center'}}>
                    <Image source={{uri: item.image}} style={{height: '100%', aspectRatio: 1, borderRadius:10, marginRight: 10}}/>
                    <Text style={styles.categoryTitle}>{item.title}</Text>
                </View>
                {/* Buttons */}
                <View style={{flex:1, justifyContent:'space-evenly', height:'100%'}}>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Ionicons name='pencil' color={Colors.GREEN} size={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Ionicons name='trash' color={Colors.ERROR_RED} size={20}/>
                    </TouchableOpacity>
                </View>

                <Ionicons name='chevron-forward' color={Colors.GREY} size={25}/>
            </View>
        )
    }

    if(loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size={65} color={Colors.ORANGE}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content'/>
            <FlatList 
                data={categories}
                keyExtractor={item => item.id}
                renderItem={renderCategoryItem}
                ItemSeparatorComponent={() => <View style={styles.separator}/>}
            />
            <TouchableOpacity style={styles.addBtn}>
                <Ionicons name='add' color={Colors.WHITE} size={60}/>
            </TouchableOpacity>
        </View>
    )
}

export default MenuScreen

const styles = StyleSheet.create({
    loader:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    container:{
        flex:1,
        padding:10
    },
    separator:{
        height:10,
        width:'100%',
    },
    categoryItem:{
        width: '100%',
        height: 100,
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    categoryTitle:{
        fontWeight:'bold',
        fontSize: 18
    },
    actionBtn:{
        height: 35,
        width:35,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:100,
        borderWidth: 0.5,
        borderColor: Colors.LIGHTER_GREY
    },
    addBtn:{
        backgroundColor: Colors.ORANGE,
        alignItems:'center',
        justifyContent:'center',
        width:70,
        height:70,
        borderRadius: 40,
        // alignSelf:'flex-end',
        position:'absolute',
        zIndex: 10, 
        bottom: 20,
        right: 20
    }
})