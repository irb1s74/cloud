import { IUser } from '../../../models/IUser';
import { AuthState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authLogin } from './action';

const initialState: AuthState = {
  user: {} as IUser,
  isAuth: false,
  isAuthLoading: true,
  isUserLoading: false,
  messageError: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: IUser; isAuth: boolean }>) {
      state.user = action.payload.user;
      state.isAuth = action.payload.isAuth;
    },
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.isAuthLoading = action.payload;
    },
  },
  extraReducers: {
    [authLogin.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isAuthLoading = false;
      state.isUserLoading = false;
      state.messageError = '';
    },
    [authLogin.pending.type]: (state) => {
      state.isAuth = false;
      state.isUserLoading = true;
      state.isAuthLoading = true;
    },
    [authLogin.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isAuth = false;
      state.isUserLoading = false;
      state.isAuthLoading = false;
      state.messageError = action.payload;
    },
  },
});

export default authSlice.reducer;
