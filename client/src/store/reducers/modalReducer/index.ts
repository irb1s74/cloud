import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState } from './types';
import { IModal } from '../../../models/IModal';

const initialState: ModalState = {
  modals: [],
};

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModal(state, action: PayloadAction<IModal>) {
      const modals = state.modals;
      modals.push(action.payload);
      state.modals = modals;
    },
    closeModal(state) {
      const modals = state.modals;
      modals.pop();
      state.modals = modals;
    },
  },
  extraReducers: {},
});

export default modalSlice.reducer;
