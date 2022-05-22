import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import LoginButton from '../../widgets/login_button';

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>LoginScreen</Text>
      <LoginButton />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>Move to Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
