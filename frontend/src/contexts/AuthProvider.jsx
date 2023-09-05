import React, { useState, useCallback, useMemo } from 'react';
import { AuthContext } from './contexts.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(currentUser));
  const [userData, setUserData] = useState(currentUser || null);

  const logIn = useCallback((data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setIsLoggedIn(true);
    setUserData(data);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setUserData(null);
    setIsLoggedIn(false);
  }, []);

  const authContextData = useMemo(() => ({
    isLoggedIn,
    logIn,
    logOut,
    userData,
  }), [isLoggedIn, logIn, logOut, userData]);

  return (
    <AuthContext.Provider
      value={authContextData}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
