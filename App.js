import React from 'react';
import { useFonts } from 'expo-font';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import Main from './src/Components/Main/Main';

export default function App() {
  const [loaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
