/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: null,
    id: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      const { type, id } = payload;
      state.isOpened = true;
      state.type = type;
      state.id = id ?? null;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.id = null;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
