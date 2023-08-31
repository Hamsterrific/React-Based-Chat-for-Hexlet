import { createSelector } from 'reselect';

export const channelsInfoSelector = (state) => state.channelsInfo;
const messagesInfoSelector = (state) => state.messagesInfo;

export const getActiveChannel = createSelector(
  channelsInfoSelector,
  (channelsInfo) => {
    const { channels, activeChannelId } = channelsInfo;
    const activeChannel = channels.find((channel) => channel.id === activeChannelId);
    return activeChannel;
  },
);

export const getActiveChannelMessages = createSelector(
  channelsInfoSelector,
  messagesInfoSelector,
  (channelsInfo, messagesInfo) => {
    const { activeChannelId } = channelsInfo;
    const { messages } = messagesInfo;
    const activeChannelMessages = messages
      .filter((message) => message.channelId === activeChannelId);
    return activeChannelMessages;
  },
);

export const getChannelNames = createSelector(
  channelsInfoSelector,
  (channelsInfo) => {
    const { channels } = channelsInfo;
    const channelNames = channels.map((channel) => channel.name);
    return channelNames;
  },
);

export const getChannelById = (channelId) => (
  createSelector(channelsInfoSelector, (channelsInfo) => {
    const { channels } = channelsInfo;
    const targetChannel = channels.find((channel) => channelId === channel.id);
    return targetChannel;
  }));
