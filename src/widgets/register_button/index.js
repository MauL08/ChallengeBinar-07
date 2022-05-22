import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const RegisterButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Main')}>
      <Text>Register</Text>
    </TouchableOpacity>
  );
};

export default RegisterButton;
