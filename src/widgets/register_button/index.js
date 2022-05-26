import { TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { setRegister } from '../../data/slices/userSlice';
import { styles } from './styles';
import { setLoading } from '../../data/slices/globalSlice';

const RegisterButton = ({ name, email, password, image, phoneNumber }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.global);

  const saveUserCredentialsToFirebase = id => {
    const reference = database().ref(`/users/${id}`);
    if (image === '') {
      image =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQudhbFG-3Q4clb7ryhoT7PoyDHfpde8Ke4w&usqp=CAU';
    }
    const content = {
      bio: '',
      email,
      name,
      id,
      image,
      phoneNumber,
    };
    try {
      reference.set(content);
      dispatch(setRegister(content));
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
      Alert.alert('Error', 'Please fill form correctly!');
    } else {
      if (emailStatus && password.length >= 8) {
        dispatch(setLoading(true));
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(res => {
            saveUserCredentialsToFirebase(res.user.uid);
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
        <Text style={styles.text}>Register</Text>
      )}
    </TouchableOpacity>
  );
};

export default RegisterButton;
