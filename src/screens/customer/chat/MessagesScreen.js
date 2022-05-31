import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, LogBox } from 'react-native';

import { getPostLogin } from '../../../helpers/ApiHelpers'
// import Messages from '../../../model/messages';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

LogBox.ignoreAllLogs()

let socket;

const MessagesScreen = props => {

    const [ socketConnected, setSocketConnected ] = useState(false)
    const [ user, setUser ] = useState({})

    useEffect( async() => {
        setUser( await AsyncStorage.getItem('userInfo') )
        socket = io('https://cerv-api.herokuapp.com')
        socket.emit('setup',user)
        socket.on('connected', () => setSocketConnected(true))
        getAllChats();
    },[])

    useEffect( () => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getAllChats();
        })
        return unsubscribe;
    }, [props.navigation])

    const [allChats, setAllChats] = useState([])

    const getAllChats = async() => {
        const response = await getPostLogin('/chat/getChats')
        // console.log(response.data.chats)
        if(response.success) {
            setAllChats(response.data.chats)
        } else {
            console.log(response);
        }
    }

    const navigateHandler = (chatObj) => {
        console.log(chatObj);
        props.navigation.navigate('Chat',{ chatObj })
    }

    return (
        <View style={styles.container} >
            <FlatList 
                data={allChats}
                keyExtractor={item => item.id}
                renderItem={ ({item}) => (
                    <TouchableOpacity style={styles.card} onPress={ () => { navigateHandler(item) } }>
                        <View style={styles.userInfo}>
                            <View style={styles.imgWrapper}>
                                <Image source={{uri:item.caterer.image}} style={styles.userImg} />
                            </View>
                            <View style={styles.textSection}>
                                <View style={styles.userInfoText} >
                                    <Text style={styles.userName}>{item.caterer.name}</Text>
                                    <Text style={styles.postTime}>{moment(item.updatedAt).format('hh:mm A')}</Text>
                                </View>
                                <Text style={styles.messageText}>{item.lastMessage}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ) }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:20,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    card:{
        width:'100%',
        height:80
    },
    userInfo:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    imgWrapper:{
        paddingVertical:15
    },
    userImg:{
        width:50,
        height:50,
        borderRadius:25
    },
    textSection:{
        flexDirection:'column',
        justifyContent:'space-between',
        padding:15,
        paddingLeft:0,
        marginLeft:10,
        width:300
    },
    userInfoText:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:5
    },
    userName:{
        fontSize:14,
        fontWeight:'bold'
    },
    postTime:{
        fontSize:12,
        color:'#666'
    },
    messageText:{
        fontSize:14,
        color:'#333333'
    }
});

export default MessagesScreen;