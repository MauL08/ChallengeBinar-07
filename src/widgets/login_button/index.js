import { TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { styles } from './styles';
import { setLogin } from '../../data/slices/userSlice';
import { setLoading } from '../../data/slices/globalSlice';

const LoginButton = ({ email, password }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.global);

  const getCredentialsFromFirebase = id => {
    const reference = database().ref(`/users/${id}`);
    try {
      reference.on('value', snapshot => {
        dispatch(setLogin(snapshot.val()));
      });
      navigation.navigate('Main');
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const formChecker = () => {
    const emailRegEx = /[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-z]/;
    const emailStatus = emailRegEx.test(email);

    if (email.length === 0 && password.length === 0) {
      Alert.alert('Error', 'Empty form, Please fill form correctly!');
    } else {
      if (emailStatus && password.length >= 8) {
        dispatch(setLoading(true));
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(res => {
            getCredentialsFromFirebase(res.user.uid);
          })
          .catch(error => {
            Alert.alert('Error', error.message);
            dispatch(setLoading(false));
          });
      } else {
        Alert.alert('Error', 'Invalid Form!');
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={() => formChecker()}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.text}>Login</Text>
      )}
    </TouchableOpacity>
  );
};

export default LoginButton;
