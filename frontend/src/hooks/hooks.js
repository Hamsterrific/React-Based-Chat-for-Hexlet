import { useContext } from 'react';

import { AuthContext, ChatApiContext } from '../contexts/contexts.js';

export const useAuth = () => useContext(AuthContext);
export const useChatApi = () => {
  const chatApi = useContext(ChatApiContext);
  return chatApi;
};
