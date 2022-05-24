import { TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

import { setRegister } from '../../data/slices/userSlice';
import { styles } from './styles';
import { setLoading } from '../../data/slices/globalSlice';

const RegisterButton = ({ email, password }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.global);

  const formChecker = () => {
    const emailRegEx = /[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-z]/;
    const emailStatus = emailRegEx.test(email);

    if (email.length === 0 && password.length === 0) {
      Alert.alert('Error', 'Empty form, Please fill form correctly!');
    } else {
      if (emailStatus && password.length >= 8) {
        dispatch(setLoading(true));
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(res => {
            dispatch(setRegister(res));
            dispatch(setLoading(false));
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
