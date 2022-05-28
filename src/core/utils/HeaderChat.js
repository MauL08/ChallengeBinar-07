import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import { BackIcon } from '../assets';
import { useNavigation } from '@react-navigation/native';

const ChatHeader = props => {
  const { data } = props;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={BackIcon} style={styles.backIcon} />
      </TouchableOpacity>
      <Image source={{ uri: data.image }} style={styles.headerImage} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text
          numberOfLines={1}
          style={{
            color: 'white',
            fontSize: 16,
            textTransform: 'capitalize',
          }}>
          {data.name}
        </Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: 'green',
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    height: ms(50),
    width: ms(50),
  },
  backIcon: {
    marginHorizontal: ms(10),
    tintColor: 'white',
  },
});

//make this component available to the app
export default ChatHeader;
