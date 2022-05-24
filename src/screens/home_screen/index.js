import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { userInfo, id } = useSelector(state => state.user);
  const navigation = useNavigation();

  return (
    <View>
      <Text>User Login {userInfo}</Text>
      <Text>User Login ID {id}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
