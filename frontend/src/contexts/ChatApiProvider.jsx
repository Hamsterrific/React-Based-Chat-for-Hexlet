import React from 'react';
import { ChatApiContext } from './contexts.js';

const ChatApiProvider = ({ socket, children }) => {
  const chatApi = {
    addMessage: (data) => {
      return new Promise((resolve, reject) => {
        socket.emit('newMessage', data, (response) => {
          if (response.status === 'ok') {
            resolve();
          } else {
            reject();
          }
        });
      });
    },
    addChannel: (data) => {
       return new Promise((resolve, reject) => {
        socket.emit('newChannel', data, (response) => {
          if (response.status === 'ok') {
            resolve(response.data);
          } else {
            reject();
          }
        });
      });
    },
    renameChannel: (data) => {
      return new Promise((resolve, reject) => {
        socket.emit('renameChannel', data, (response) => {
          if (response.status === 'ok') {
            resolve();
          } else {
            reject();
          }
        });
      });
    },
    deleteChannel: (data) => {
      return new Promise((resolve, reject) => {
        socket.emit('removeChannel', data, (response) => {
          if (response.status === 'ok') {
            resolve();
          } else {
            reject();
          }
        });
      });
    },
  };

  return (
    <ChatApiContext.Provider value={chatApi}>
      {children}
    </ChatApiContext.Provider>
  );
};

export default ChatApiProvider;
