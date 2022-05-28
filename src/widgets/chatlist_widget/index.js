import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import AppConfig from '../../core/utils/app_config';
import { ms } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

const ChatsWidget = () => {
  const navigation = useNavigation();
  const { id, userInfo } = useSelector(state => state.user);
  const [allChat, setAllChat] = useState([]);

  const getAllChat = useCallback(async () => {
    database()
      .ref(`/chatroom/${id}`)
      .on('value', snapshot => {
        if (snapshot.val() === null) {
          setAllChat([]);
        } else {
          setAllChat(Object.values(snapshot.val()));
        }
      });
  }, [id]);

  useEffect(() => {
    getAllChat();
  }, [getAllChat]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Chats</Text>
      <FlatList
        data={allChat}
        inverted
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.friendsContainer}
            onPress={() =>
              navigation.navigate('Chat', {
                friendContent: item,
                userContent: userInfo,
              })
            }>
            <Image source={{ uri: item.image }} style={styles.imageFriends} />
            <View style={styles.friendInfoContainer}>
              <Text style={styles.nameFriends}>{item.name}</Text>
              <Text style={styles.bioFriends}>{item.latestMessage}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default ChatsWidget;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: AppConfig.heading2Size,
    fontWeight: 'bold',
    marginBottom: AppConfig.paddingL,
  },
  friendsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    paddingVertical: AppConfig.paddingS,
    width: width,
    borderRadius: ms(6),
  },
  imageFriends: {
    height: ms(70),
    width: ms(70),
    marginLeft: AppConfig.paddingL,
  },
  nameFriends: {
    fontSize: AppConfig.heading3Size,
    fontWeight: 'bold',
  },
  friendInfoContainer: {
    marginLeft: AppConfig.paddingL,
  },
});
