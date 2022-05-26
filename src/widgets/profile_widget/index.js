import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import { useDispatch } from 'react-redux';

import { setLoading } from '../../data/slices/globalSlice';
import AppConfig from '../../core/utils/app_config';
import { ms } from 'react-native-size-matters';

const ProfileWidget = () => {
  const { id } = useSelector(state => state.user);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState({});

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
    <View style={styles.container}>
      <Text style={styles.bioText}>
        {data.bio === '' ? 'Bio Empty' : data.bio}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image source={{ uri: data.image }} style={styles.profileImage} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileWidget;

const styles = StyleSheet.create({
  container: {
    margin: ms(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppConfig.baseColor,
    padding: ms(12),
    elevation: 5,
    borderRadius: ms(8),
  },
  profileImage: {
    height: ms(60),
    width: ms(60),
    borderRadius: ms(50),
  },
  bioText: {
    fontSize: AppConfig.heading3Size,
    fontWeight: '500',
  },
});
