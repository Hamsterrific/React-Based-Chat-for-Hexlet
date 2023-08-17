export const channelsInfo = (state) => state.channelsInfo;

export const getActiveChannel = (state) => {
    const { channels, activeChannelId } = state.channelsInfo;
    const activeChannel = channels.find((channel) => channel.id === activeChannelId)
    return activeChannel;
}

export const getActiveChannelMessages = (state) => {
    const { activeChannelId } = state.channelsInfo;
    const { messages } = state.messagesInfo;
    const activeChannelMessages = messages.filter((message) => message.channelId === activeChannelId);
    return activeChannelMessages;
}

export const getActiveChannelId = (state) => {
    return state.channelsInfo.activeChannelId;
}