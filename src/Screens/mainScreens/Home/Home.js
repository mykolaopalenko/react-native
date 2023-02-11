import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, Ionicons } from '@expo/vector-icons';

const MainTab = createBottomTabNavigator();

import PostsScreen from '../PostsScreen/PostsScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import CreatePostsScreen from '../CreatePostsScreen/CreatePostsScreen';

const Home = ({ navigation }) => {
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 17,
          lineHeight: 22,
        },
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomWidth: 0.5,
          borderBottomColor: '#21212120',
        },
        tabBarOptions: {
          tabBarHideOnKeyboard: true,
        },
      }}
      tabBarOptions={{ showLabel: false }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: () => <Feather name="grid" color="#212121CC" size={24} />,
          headerShown: false,
          tabBarShowLabel: false,
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarStyle: { display: 'none' },
          tabBarIcon: () => (
            <View
              style={{
                width: 70,
                height: 40,
                backgroundColor: '#FF6C00',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </View>
          ),
          title: 'Створити публікацію',
          headerStyle: {
            borderBottomWidth: 0.5,
            borderBottomColor: '#212121CC',
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Roboto-Medium',
            color: '#212121',
            fontSize: 17,
            lineHeight: 22,
          },
          headerLeft: () => (
            <Feather
              name="arrow-left"
              color="#212121CC"
              size={24}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate('Posts');
              }}
            />
          ),
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: () => <Feather name="user" color="#212121CC" size={24} />,
          headerShown: false,
          tabBarShowLabel: false,
        }}
        name="Профіль"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default Home;
