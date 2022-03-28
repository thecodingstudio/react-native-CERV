import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

import Messages from '../../../model/messages';

const MessagesScreen = props => {
    return (
        <View style={styles.container} >
            <FlatList 
                data={Messages}
                keyExtractor={item => item.id}
                renderItem={ ({item}) => (
                    <TouchableOpacity style={styles.card} onPress={ () => { props.navigation.navigate('Chat', {
                        userName: item.userName
                    }) }}>
                        <View style={styles.userInfo}>
                            <View style={styles.imgWrapper}>
                                <Image source={item.userImg} style={styles.userImg} />
                            </View>
                            <View style={styles.textSection}>
                                <View style={styles.userInfoText} >
                                    <Text style={styles.userName}>{item.userName}</Text>
                                    <Text style={styles.postTime}>{item.messageTime}</Text>
                                </View>
                                <Text style={styles.messageText}>{item.messageText}</Text>
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