import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

import { styles } from './styles';
import { setLoading } from '../../data/slices/globalSlice';
import { useDispatch } from 'react-redux';

const HomeScreen = () => {
  const { id } = useSelector(state => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [key, setKey] = useState([]);
  const [data, setData] = useState([]);

  const getData = amount => {
    let keyFirebase = [];
    keyFirebase = Object.keys(amount);
    setKey(keyFirebase);
    setData(amount);
  };

  const fetchData = useCallback(() => {
    const reference = database().ref('/testData');
    console.log(reference);
    reference.on('value', snapshot => {
      getData(snapshot.val());
      dispatch(setLoading(false));
    });
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View>
      <Text>User Saved ID (RTK) {id}</Text>
      <Text>User Login Cred {data}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
