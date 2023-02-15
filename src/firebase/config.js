import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
   apiKey: 'AIzaSyDYoEbd6dDtd-NWY9K30Fuq2IaelHmdBzs',
   authDomain: 'react-native-c5641.firebaseapp.com',
   projectId: 'react-native-c5641',
   storageBucket: 'react-native-c5641.appspot.com',
   messagingSenderId: '246592967172',
   appId: '1:246592967172:web:6708d4bdc832853d27db51',
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
   persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(app);
export const db = getFirestore(app);
