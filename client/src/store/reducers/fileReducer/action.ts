import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../../api/AuthService';

export const authLogin = createAsyncThunk(
  'auth/login',
  async (token: string, thunkAPI) => {
    try {
      const response = await AuthService.Login(token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Auth error');
    }
  }
);
