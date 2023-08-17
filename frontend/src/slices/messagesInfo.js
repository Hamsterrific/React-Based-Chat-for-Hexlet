import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsInfoActions } from './channelsInfo.js';
import fetchData from '../fetchData.js';

const { deleteChannel } = channelsInfoActions;

const slice = createSlice({
  name: 'channelsInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(state, { payload }) {
      const { channel } = payload;
      state.channels.push(channel);
    },
    deleteMessage(state, { payload }) {
      state.messages = state.messages.filter(
        (message) => message.id !== payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchData.fulfilled, (state, { payload }) => {
      state.messages = payload.messages;
    })
    .addCase(deleteChannel, (state, {payload}) => {
        state.messages = state.messages.filter(
            (message) => message.channelId !== payload.id,
          );
    })
  }
});

export const { actions } = slice;
export default slice.reducer;