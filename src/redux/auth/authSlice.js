import { createSlice } from '@reduxjs/toolkit';
import {
  registration,
  login,
  logout,
  updateUserAvatar,
} from './authOperations';

const initialState = {
  user: {
    userId: null,
    name: null,
    email: null,
    photoUri: null,
  },
  isAuth: false,
  isLoading: false,
  error: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserInfo(state, { payload }) {
      state.user = { ...payload.user };
      state.isAuth = payload.isAuth;
      state.isVisibleTabBar = payload.isVisibleTabBar;
      state.isLoading = false;
      state.error = false;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(registration.pending, state => {
      state.isLoading = true;
      state.error = false;
    });
    addCase(registration.fulfilled, (state, { payload }) => {
      state.user.userId = payload.userId;
      state.user.name = payload.name;
      state.user.email = payload.email;
      state.user.photoUri = payload.photoUri;
      state.isAuth = true;
      state.isLoading = false;
      state.error = false;
    });
    addCase(registration.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    addCase(login.pending, state => {
      state.isLoading = true;
      state.error = false;
    });
    addCase(login.fulfilled, (state, { payload }) => {
      state.user.userId = payload.userId;
      state.user.name = payload.name;
      state.user.email = payload.email;
      state.user.photoUri = payload.photoUri;
      state.isAuth = true;
      state.isLoading = false;
      state.error = false;
    });
    addCase(login.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });


    addCase(logout.pending, state => {
      state.isLoading = true;
      state.error = false;
    });
    addCase(logout.fulfilled, state => {
      state.user.userId = null;
      state.user.name = null;
      state.user.email = null;
      state.user.photoUri = null;
      state.isAuth = false;
      state.isLoading = false;
      state.error = false;
    });
    addCase(logout.rejected, state => {
      state.isLoading = false;
      state.error = payload;
    });

    
    addCase(updateUserAvatar.pending, state => {
      state.isLoading = true;
      state.error = false;
    });
    addCase(updateUserAvatar.fulfilled, (state, { payload }) => {
      state.user.photoUri = payload;
      state.isLoading = false;
      state.error = false;
    });
    addCase(updateUserAvatar.rejected, state => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});
export const { updateUserInfo } = authSlice.actions;

export const authReducer = authSlice.reducer;
