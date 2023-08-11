import React, { useState } from 'react';
import AuthContext from './contexts.js';

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('userId'));
    console.log(currentUser);
    const [loggedIn, setLoggedIn] = useState(Boolean(currentUser));
    const [user, setUser] = useState(
      currentUser ? { username: currentUser.username } : null,
    );
  
    const logIn = (userData) => {
        setLoggedIn(true);
        setUser({ username: userData.username });
      };

    const logOut = () => {
      localStorage.removeItem('userId');
      setUser(null);
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
      <AuthContext.Provider value={{ loggedIn, logIn, logOut, getAuthHeader, user }}>
        {children}
      </AuthContext.Provider>
    );
  };

export default AuthProvider;