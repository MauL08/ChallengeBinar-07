import { View, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeIcon, ChatIcon, GroupIcon } from '../assets';
import { HomeScreen, ChatScreen, ContactScreen } from '../../screens';

import { styles, tabBarStyle } from '../../widgets/bottom_navigator/styles';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabBarStyle,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        // initialParams={{ email: route.params.email }}
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image source={HomeIcon} style={styles.icon(focused)} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image source={ChatIcon} style={styles.icon(focused)} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image source={GroupIcon} style={styles.icon(focused)} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
