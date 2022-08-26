import { FileState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FileState = {
  parentId: 0,
  path: '',
  messageError: '',
};

export const fileSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPath(state, action: PayloadAction<{ path: string; parentId: number }>) {
      state.path = action.payload.path;
      state.parentId = action.payload.parentId;
    },
  },
  extraReducers: {},
});

export default fileSlice.reducer;
