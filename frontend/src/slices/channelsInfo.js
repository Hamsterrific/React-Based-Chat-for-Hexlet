import { createSlice } from '@reduxjs/toolkit';
import fetchData from '../fetchData.js';

const defaultChannelId = 1;

const slice = createSlice({
  name: 'channelsInfo',
  initialState: {
    loadingStatus: 'idle',
    channels: [],
    activeChannelId: defaultChannelId,
  },
  reducers: {
    setActiveChannel(state, { payload }) {
      state.activeChannelId = payload;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
    deleteChannel(state, { payload }) {
      state.channels = state.channels.filter(
        (channel) => channel.id !== payload.id
      );
      if (state.activeChannelId === payload.id) {
        state.activeChannelId = defaultChannelId;
      }
    },
    renameChannel(state, { payload }) {
      const { name, id } = payload;
      const channelById = state.channels.find((channel) => id === channel.id);
      channelById.name = name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.loadingStatus = 'idle';
        state.channels = payload.channels;
        state.currentChannelId = payload.activeChannelId;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loadingStatus = 'failed';
      });
  },
});

export const { actions } = slice;
export default slice.reducer;
