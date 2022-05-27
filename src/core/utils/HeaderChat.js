//import liraries
import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
// create a component
const ChatHeader = props => {
  const { data } = props;
  // const [lastSeen, setlastSeen] = useState('')

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
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
    height: 70,
    backgroundColor: 'green',
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

//make this component available to the app
export default ChatHeader;
