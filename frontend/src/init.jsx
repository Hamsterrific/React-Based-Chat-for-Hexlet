import React from 'react';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from './locales/locales.js';
import reducer, { actions } from './slices/slices.js';
import AuthProvider from './contexts/AuthProvider.jsx';
import ChatApiProvider from './contexts/ChatApiProvider.jsx';

const init = async () => {
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

  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    debug: true,
    resources,
    fallbackLng: 'ru',
  });

  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Provider store={store}>
          <ChatApiProvider socket={socket}>
            <App />
          </ChatApiProvider>
        </Provider>
      </AuthProvider>
    </I18nextProvider>
  );
};

export default init;
