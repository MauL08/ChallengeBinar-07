import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import AppConfig from '../../core/utils/app_config';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../data/slices/userSlice';

import auth from '@react-native-firebase/auth';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(setLogout());
        navigation.navigate('Login');
      });
  };

  return (
    <TouchableOpacity onPress={() => onLogout()} style={styles.button}>
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    padding: AppConfig.paddingL,
    borderRadius: ms(6),
    marginBottom: ms(24),
  },
  text: {
    color: AppConfig.baseColor,
    fontWeight: 'bold',
  },
});
