import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import LoginButton from '../../widgets/login_button';
import ScreenStatusBar from '../../widgets/screen_status_bar';
import { styles } from './styles';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <ScreenStatusBar />
      <View style={styles.main}>
        <Text style={styles.title}>Login Screen</Text>
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
        <LoginButton email={email} password={password} />
        <TouchableOpacity
          style={styles.moveButton}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.moveButtonText}>Move to Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
