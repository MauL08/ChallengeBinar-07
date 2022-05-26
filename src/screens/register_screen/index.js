import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import RegisterButton from '../../widgets/register_button';
import ScreenStatusBar from '../../widgets/screen_status_bar';
import { styles } from './styles';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(0);

  return (
    <View style={styles.container}>
      <ScreenStatusBar />
      <View style={styles.main}>
        <Text style={styles.title}>Register Screen</Text>
        <TextInput
          style={styles.usernameInputBar}
          placeholder="Name"
          onChangeText={e => setName(e)}
        />
        <TextInput
          style={styles.emailInputBar}
          placeholder="Email"
          onChangeText={e => setEmail(e)}
        />
        <TextInput
          style={styles.passwordInputBar}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={e => setPassword(e)}
        />
        <TextInput
          style={styles.imageInputBar}
          placeholder="Image URL"
          onChangeText={e => setImage(e)}
        />
        <TextInput
          style={styles.numberInputBar}
          placeholder="Phone Number"
          onChangeText={e => setPhoneNumber(e)}
          keyboardType="number-pad"
        />
        <RegisterButton
          name={name}
          email={email}
          password={password}
          image={image}
          phoneNumber={phoneNumber}
        />
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
