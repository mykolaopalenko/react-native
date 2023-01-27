import React from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';

export default function App() {
  const [loaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <LoginScreen /> */}
      <RegistrationScreen />
    </View>
  );
}