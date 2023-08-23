import React from 'react';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import reducer, { actions } from './slices/slices.js';
import AuthProvider from './contexts/AuthProvider.jsx';
import ChatApiProvider from './contexts/ChatApiProvider.jsx';

const init = () => {  
  const store = configureStore({
    reducer,
  });
  const { dispatch } = store;
  const socket = io();
  const { addMessage, addChannel, deleteChannel, renameChannel } = actions;
  socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    dispatch(addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    dispatch(deleteChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    dispatch(renameChannel(payload));
  });

  const vdom = (
    <Provider store={store}>
      <AuthProvider>
        <ChatApiProvider socket={socket}>
          <App />
        </ChatApiProvider>
      </AuthProvider>
    </Provider>
  );

  return vdom;
};

export default init;
