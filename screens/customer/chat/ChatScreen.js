import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Colors from '../../../constants/Colors';

const ChatScreen = props => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
            },
        },
        {
            _id: 2,
            text: 'Hello! ',
            createdAt: new Date(),
            user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
            },
        }
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])

    const renderBubble = (props) => {
        return (<Bubble 
            {...props}
            wrapperStyle={{
                right:{ 
                    backgroundColor:'#cccccc'
                },
                left:{
                    backgroundColor:Colors.orange
                }
            }}
            textStyle={{
                right:{
                    color:'black'
                },
                left:{
                    color:'white'
                }
            }}
        />)
    };

    const renderSend = (props) => {
        return (
            <Send {...props} >
                <View>
                    <MaterialCommunityIcons name='send-circle' size={32} color={Colors.orange} style={{marginBottom:5, marginRight:5}}/>
                </View>
            </Send>
        )
    };

    const scrollToBottomComponent = (props) => {
        return (
            <FontAwesome name='angle-double-down' size={22} color="#333"/>
        )
    };

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
            renderBubble={renderBubble}
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent}
        />
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});

export default ChatScreen;