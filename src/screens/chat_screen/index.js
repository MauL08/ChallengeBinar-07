import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import database from '@react-native-firebase/database';
import moment from 'moment';
import ChatHeader from '../../core/utils/HeaderChat';
import MessageComponent from '../../core/utils/MessageComponent';

const ChatScreen = ({ route }) => {
  const { userContent, friendContent } = route.params;
  const [message, setMessage] = useState('');
  const [allChat, setAllChat] = useState([]);

  useEffect(() => {
    const onChildAdd = database()
      .ref('/messages/' + friendContent.roomId)
      .on('child_added', snapshot => {
        setAllChat(state => [snapshot.val(), ...state]);
      });
    return () =>
      database()
        .ref('/messages' + friendContent.roomId)
        .off('child_added', onChildAdd);
  }, [friendContent.roomId]);

  const onSendMessage = () => {
    if (message === '') {
      Alert.alert('Error', 'Type Something');
    }
    let messageData = {
      roomId: friendContent.roomId,
      message: message,
      from: userContent?.id,
      to: friendContent.id,
      sendTime: moment().format(''),
    };

    const newChatroomRef = database()
      .ref(`/messages/${friendContent.roomId}`)
      .push();

    messageData.id = newChatroomRef.key;

    newChatroomRef.set(messageData).then(() => {
      let chatroomUpdate = {
        latestMessage: message,
        sendTime: messageData.sendTime,
      };

      database()
        .ref(`/chatroom/${friendContent?.id}/${userContent?.id}`)
        .update(chatroomUpdate);

      database()
        .ref(`/chatroom/${userContent?.id}/${friendContent?.id}`)
        .update(chatroomUpdate);

      setMessage('');
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ChatHeader data={friendContent} />
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={allChat}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          inverted
          renderItem={({ item }) => {
            return (
              <MessageComponent
                sender={item.from === userContent.id}
                item={item}
              />
            );
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: 'green',
          elevation: 5,
          // height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 7,
          justifyContent: 'space-evenly',
          paddingBottom: 20,
        }}>
        <TextInput
          style={{
            backgroundColor: 'white',
            width: '80%',
            borderRadius: 25,
            borderWidth: 0.5,
            borderColor: 'white',
            paddingHorizontal: 15,
            color: 'black',
            paddingBottom: 10,
          }}
          placeholder="type a message"
          placeholderTextColor="black"
          multiline={true}
          value={message}
          onChangeText={val => setMessage(val)}
        />
        <TouchableOpacity onPress={() => onSendMessage()}>
          <Text style={{ color: 'white' }}>Send!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
