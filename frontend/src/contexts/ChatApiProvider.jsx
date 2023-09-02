import React, { useMemo } from 'react';
import { ChatApiContext } from './contexts.js';

const createApiMethod = (socket, eventName) => (data) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout'));
    }, 3000);

    socket.emit(eventName, data, (response) => {
      if (response.status === 'ok') {
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  }));

const ChatApiProvider = ({ socket, children }) => {
  const chatApi = useMemo(() => ({
    addMessage: createApiMethod(socket, 'newMessage'),
    addChannel: createApiMethod(socket, 'newChannel'),
    renameChannel: createApiMethod(socket, 'renameChannel'),
    deleteChannel: createApiMethod(socket, 'removeChannel'),
  }), [socket]);

  return (
    <ChatApiContext.Provider value={chatApi}>
      {children}
    </ChatApiContext.Provider>
  );
};

export default ChatApiProvider;
