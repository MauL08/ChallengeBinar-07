import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import AppConfig from '../../core/utils/app_config';
import { ms } from 'react-native-size-matters';
import database from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

const { height, width } = Dimensions.get('screen');

const ContactScreen = () => {
  const [dialog, setDialog] = useState(false);
  const { id, userInfo } = useSelector(state => state.user);
  const navigation = useNavigation();

  const [friends, setFriends] = useState([]);
  const [friendsBackup, setFriendsBackup] = useState([]);

  const getAllFriend = useCallback(() => {
    database()
      .ref('/users')
      .once('value')
      .then(snapshot => {
        setFriends(
          Object.values(snapshot.val()).filter(item => item.id !== id),
        );
        setFriendsBackup(
          Object.values(snapshot.val()).filter(item => item.id !== id),
        );
      });
  }, [id]);

  const searchFriend = value => {
    setFriends(friendsBackup.filter(item => item.name.match(value)));
  };

  const onChatroomOpen = data => {
    database()
      .ref(`/chatroom/${userInfo.id}/${data.id}`)
      .on('value', snapshot => {
        if (snapshot.val() == null) {
          let roomId = uuid.v4();

          // myData
          let currData = {
            roomId,
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            image: userInfo.image,
            latestMessage: '',
          };

          // Friend
          data.latestMessage = '';
          data.roomId = roomId;

          // update myData
          database()
            .ref(`/chatroom/${data.id}/${userInfo.id}`)
            .update(currData);

          // update Friend Data
          database().ref(`/chatroom/${userInfo.id}/${data.id}`).update(data);

          navigation.navigate('Chat', {
            friendContent: data,
            userContent: userInfo,
          });
        } else {
          navigation.navigate('Chat', {
            friendContent: snapshot.val(),
            userContent: userInfo,
          });
        }
      });
  };

  useEffect(() => {
    getAllFriend();
  }, [getAllFriend]);

  if (dialog) {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={dialog}
        onRequestClose={() => {
          setDialog(false);
        }}>
        <View style={dialogStyle.container}>
          <View style={dialogStyle.dialogContainer}>
            <Text style={dialogStyle.title}>Add Your Friend</Text>
            <TextInput placeholder="Email" style={dialogStyle.form} />
            <Text>or</Text>
            <TextInput
              placeholder="Phone Number"
              style={dialogStyle.form}
              keyboardType="number-pad"
            />
            <View style={dialogStyle.buttonContainer}>
              <TouchableOpacity
                onPress={() => setDialog(false)}
                style={dialogStyle.cancelAdd}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // onAddFriend();
                  setDialog(false);
                }}
                style={dialogStyle.confirmAdd}>
                <Text>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>All Friends</Text>
          <TouchableOpacity
            style={styles.addFriendButton}
            onPress={() => setDialog(true)}>
            <Text>Add Friends</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.friendlistContainer}>
          <TextInput
            placeholder="Search Name"
            style={dialogStyle.form}
            onChangeText={text => searchFriend(text)}
          />
          <FlatList
            data={friends}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.friendsContainer}
                onPress={() => onChatroomOpen(item)}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.imageFriends}
                />
                <View style={styles.friendInfoContainer}>
                  <Text style={styles.nameFriends}>{item.name}</Text>
                  <Text style={styles.bioFriends}>{item.bio}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    );
  }
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppConfig.baseColor,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: AppConfig.paddingXL,
  },
  titleText: {
    fontSize: AppConfig.heading2Size,
    fontWeight: 'bold',
  },
  addFriendButton: {
    backgroundColor: AppConfig.buttonColor,
    padding: AppConfig.paddingS,
    borderRadius: ms(8),
  },
  friendlistContainer: {
    alignItems: 'center',
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

const dialogStyle = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
  },
  dialogContainer: {
    alignItems: 'center',
    backgroundColor: AppConfig.baseColor,
    padding: AppConfig.paddingXL,
    elevation: 2,
    borderRadius: ms(8),
    width: ms(220),
    height: ms(280),
  },
  buttonContainer: {
    marginTop: AppConfig.paddingL,
    width: ms(200),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  cancelAdd: {
    backgroundColor: 'red',
    padding: AppConfig.paddingL,
    borderRadius: ms(8),
  },
  confirmAdd: {
    backgroundColor: AppConfig.buttonColor,
    padding: AppConfig.paddingL,
    borderRadius: ms(8),
  },
  form: {
    marginVertical: AppConfig.paddingL,
    padding: AppConfig.paddingL,
    borderWidth: 1,
    width: ms(180),
    borderRadius: ms(8),
  },
  title: {
    fontSize: AppConfig.heading2Size,
    fontWeight: 'bold',
  },
});
