import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { navigate } from './navigator';

import { LoginScreen, RegisterScreen, ProfileScreen } from '../../screens';
import MainTabs from './bottom_nav';

const Stack = createNativeStackNavigator();

const Router = () => {
  const { id } = useSelector(state => state.user);

  useEffect(() => {
    if (id !== '') {
      navigate('Main');
    }
  }, [id]);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default Router;
