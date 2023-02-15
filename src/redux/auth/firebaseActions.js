import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserInfo } from './authSlice';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../../firebase/config';

export const getUserInfo = createAsyncThunk(
   'auth/getUserInfo',
   async (_, { dispatch, rejectWithValue }) => {
      try {
         await onAuthStateChanged(auth, user => {
            if (user) {
               dispatch(
                  updateUserInfo({
                     isAuth: true,
                     user: {
                        email: user.email,
                        userId: user.uid,
                        name: user.displayName,
                        photoUri: user.photoURL,
                     },
                  })
               );
            } else {
               dispatch(
                  updateUserInfo({
                     isAuth: false,
                     user: {
                        email: '',
                        userId: '',
                        name: '',
                        photoUri: '',
                     },
                  })
               );
            }
         });
      } catch (error) {
         return rejectWithValue(error.request.message);
      }
   }
);
