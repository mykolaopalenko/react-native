import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/auth/authOperations';
import DefaultScreenPosts from '../../nestedScreens/DafaultScreenPosts/DefaultScreenPosts';
import CommentsScreen from '../../nestedScreens/CommentsScreen/CommentsScreen';
import MapScreen from '../../nestedScreens/MapScreen/MapScreen';
import { Feather } from '@expo/vector-icons';
const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  const dispatch = useDispatch();
  return (
    <NestedScreen.Navigator
      initialRouteName="NestedScreen"
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
      }}
      tabBarOptions={{ showLabel: false }}
    >
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          title: 'Публікації',

          headerTitleStyle: {
            fontFamily: 'Roboto-Medium',
            color: '#212121',
            fontSize: 17,
            lineHeight: 22,
          },

          headerRight: () => (
            <Feather
              name="log-out"
              color="#BDBDBD"
              size={24}
              style={{ marginRight: 10 }}
              onPress={() => {
                dispatch(logout());
              }}
            />
          ),
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: 'Коментарі',
          headerTitleStyle: {
            fontFamily: 'Roboto-Medium',
            color: '#212121',
            fontSize: 17,
            lineHeight: 22,
          },
          tabBarStyle: { display: 'none' },
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Карта',
          headerTitleStyle: {
            fontFamily: 'Roboto-Medium',
            color: '#212121',
            fontSize: 17,
            lineHeight: 22,
          },
          tabBarStyle: { display: 'none' },
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
