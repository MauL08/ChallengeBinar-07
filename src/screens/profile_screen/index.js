import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { BackIcon, CheckIcon } from '../../core/assets';
import { styles } from './styles';
import { setLoading } from '../../data/slices/globalSlice';
import LogoutButton from '../../widgets/logout_button';

const ProfileScreen = () => {
  const { id } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const navigation = useNavigation();

  const [image, setImage] = useState('');
  const [bio, setBio] = useState('');

  const updateImageFirebase = () => {
    const reference = database().ref(`/users/${id}`);
    try {
      reference.update({
        image,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const updateBioFirebase = () => {
    const reference = database().ref(`/users/${id}`);
    try {
      reference.update({
        bio,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = useCallback(() => {
    const reference = database().ref(`/users/${id}`);
    try {
      reference.on('value', snapshot => {
        setData(snapshot.val());
        dispatch(setLoading(false));
      });
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}>
        <Image source={BackIcon} />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Image source={{ uri: data.image }} style={styles.profileImage} />
          <Text style={styles.profileName}>{data.name}</Text>
          <Text style={styles.profileEmail}>{data.email}</Text>
          <Text>{data.phoneNumber}</Text>
        </View>
        <View>
          <View style={styles.labelInput}>
            <TextInput
              style={styles.inputBar}
              placeholder="Set Bio"
              onChangeText={e => setBio(e)}
            />
            <TouchableOpacity
              style={styles.labelInputButton}
              onPress={() => updateBioFirebase()}>
              <Image source={CheckIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.labelInputImage}>
            <TextInput
              style={styles.inputBar}
              placeholder="Set Image URL"
              onChangeText={e => setImage(e)}
            />
            <TouchableOpacity
              style={styles.labelInputButton}
              onPress={() => updateImageFirebase()}>
              <Image source={CheckIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <LogoutButton />
      </View>
    </View>
  );
};

export default ProfileScreen;
