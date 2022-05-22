import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const LoginButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Main')}>
      <Text>Login</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
