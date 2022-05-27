import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import { styles } from './styles';
import ProfileWidget from '../../widgets/profile_widget';
import ChatsWidget from '../../widgets/chatlist_widget';

const HomeScreen = () => {
  const { isLoading } = useSelector(state => state.global);

  if (isLoading) {
    return <ActivityIndicator style={styles.loading} color="green" />;
  } else {
    return (
      <View style={styles.container}>
        <ProfileWidget />
        <ChatsWidget />
      </View>
    );
  }
};

export default HomeScreen;
