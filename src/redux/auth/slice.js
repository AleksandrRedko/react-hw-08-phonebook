import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './initialState';
import { register, logIn, logOut, refreshUser } from './operations';

const handleRegisterFulfilled = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoggedIn = true;
};

const handleLoginFulfilled = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoggedIn = true;
};

const handleLogoutFulfilled = state => {
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
};

const handleRefreshUserFulfilled = (state, { payload }) => {
  state.user = payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
};

const handleRefreshUserRejected = state => {
  state.user = { name: null, email: null };
  state.token = null;
  state.isRefreshing = false;
};

const handleRefreshUserPending = state => {
  state.isRefreshing = true;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, handleRegisterFulfilled)
      .addCase(logIn.fulfilled, handleLoginFulfilled)
      .addCase(logOut.fulfilled, handleLogoutFulfilled)
      .addCase(refreshUser.pending, handleRefreshUserPending)
      .addCase(refreshUser.fulfilled, handleRefreshUserFulfilled)
      .addCase(refreshUser.rejected, handleRefreshUserRejected);
  },
});

export const authReducer = authSlice.reducer;
