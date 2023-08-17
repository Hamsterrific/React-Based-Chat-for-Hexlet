
import { combineReducers } from '@reduxjs/toolkit';
import channelsInfo, { actions as channelsInfoActions } from './channelsInfo.js';
import messagesInfo, { actions as messagesInfoActions } from './messagesInfo.js';

export const actions = {
    ...channelsInfoActions,
    ...messagesInfoActions,
  };

export default combineReducers({
  channelsInfo,
  messagesInfo,
});
