import React, { useState, useCallback, useMemo } from 'react';
import { AuthContext } from './contexts.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(Boolean(currentUser));
  const [username, setUsername] = useState(currentUser ? currentUser.username : null);

  const logIn = useCallback((userData) => {
    setLoggedIn(true);
    setUsername(userData.username);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setUsername(null);
    setLoggedIn(false);
  }, []);

  const getAuthHeader = useCallback(() => {
    const user = JSON.parse(localStorage.getItem('userId'));
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    logOut();
    return {};
  }, [logOut]);

  const authContextData = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
    getAuthHeader,
    username,
  }), [loggedIn, logIn, logOut, getAuthHeader, username]);

  return (
    <AuthContext.Provider
      value={authContextData}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
