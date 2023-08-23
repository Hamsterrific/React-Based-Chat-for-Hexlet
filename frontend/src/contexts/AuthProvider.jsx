import React, { useState } from 'react';
import { AuthContext } from './contexts.js';

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('userId'));
    const [loggedIn, setLoggedIn] = useState(Boolean(currentUser));
    const [username, setUsername] = useState(
      currentUser ?  currentUser.username : null,
    );
  
    const logIn = (userData) => {
        setLoggedIn(true);
        setUsername(userData.username);
      };

    const logOut = () => {
      localStorage.removeItem('userId');
      setUsername(null);
      setLoggedIn(false);
    };

    const getAuthHeader = () => {
        const userId = JSON.parse(localStorage.getItem('userId'));
      
        if (userId && userId.token) {
          return { Authorization: `Bearer ${userId.token}` };
        }
      
        return {};
      };
  
    return (
      <AuthContext.Provider value={{ loggedIn, logIn, logOut, getAuthHeader, username }}>
        {children}
      </AuthContext.Provider>
    );
  };

export default AuthProvider;