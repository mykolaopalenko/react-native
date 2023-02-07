import React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from './router';

const routing = useRoute(false);

export default function App() {
   const [loaded] = useFonts({
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
   });

   if (!loaded) {
      return null;
   }

   return <NavigationContainer>{routing}</NavigationContainer>;
}
