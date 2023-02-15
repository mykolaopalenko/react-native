import { createAsyncThunk } from '@reduxjs/toolkit';

import { auth } from '../../firebase/config.js';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { Alert } from 'react-native';

export const registration = createAsyncThunk(
  'auth/registration',
  async ({ email, password, name, photoUri }, { rejectWithValue }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoUri ? photoUri : null,
      });

      return {
        name: user.displayName,
        userId: user.uid,
        email: user.email,
        photoUri: user.photoURL,
      };
    } catch (error) {
      Alert.alert('Oops, something went wrong');
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return {
        userId: user.uid,
        email: user.email,
        name: user.displayName,
        photoUri: user.photoURL,
      };
    } catch (error) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        Alert.alert(`"Email or password invalid"`);
        return rejectWithValue(error.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      signOut(auth);
    } catch (error) {
      Alert.alert('Oops, something went wrong');
      rejectWithValue(error.message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  'auth/updateUserAvatar',
  async ({ newPhotoUri }, { rejectWithValue }) => {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: newPhotoUri,
      });
      return newPhotoUri;
    } catch (error) {
      Alert.alert('Oops, something went wrong');
      rejectWithValue(error.message);
    }
  }
);
