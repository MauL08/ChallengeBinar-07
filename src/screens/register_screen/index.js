import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import RegisterButton from '../../widgets/register_button';

const RegisterScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>RegisterScreen</Text>
      <RegisterButton />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Move to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
