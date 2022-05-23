import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import RegisterButton from '../../widgets/register_button';
import ScreenStatusBar from '../../widgets/screen_status_bar';
import { styles } from './styles';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <ScreenStatusBar />
      <View style={styles.main}>
        <Text style={styles.title}>Register Screen</Text>
        <TextInput
          style={styles.usernameInputBar}
          placeholder="Email"
          onChangeText={e => setEmail(e)}
        />
        <TextInput
          style={styles.passwordInputBar}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={e => setPassword(e)}
        />
        <RegisterButton email={email} password={password} />
        <TouchableOpacity
          style={styles.moveButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.moveButtonText}>Move to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
