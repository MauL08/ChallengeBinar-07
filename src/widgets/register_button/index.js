import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

const RegisterButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Main')}>
      <Text style={styles.text}>Register</Text>
    </TouchableOpacity>
  );
};

export default RegisterButton;
