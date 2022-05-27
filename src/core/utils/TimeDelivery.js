// import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const TimeDelivery = props => {
  const text = '';
  const { sender, item } = props;
  return (
    <View>
      <Text>{/* {moment(item.send_time).format('LLL')} */}</Text>
      {/* <Icon name={'checkmark-done'} type="Ionicons" /> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
});

//make this component available to the app
export default TimeDelivery;
