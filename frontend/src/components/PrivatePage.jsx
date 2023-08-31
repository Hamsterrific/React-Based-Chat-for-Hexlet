import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/hooks.js';
import MainPage from './MainPage.jsx';
import routes from '../routes.js';

const PrivateRoute = () => {
  const auth = useAuth();

  return auth.loggedIn ? (
    <MainPage />
  ) : (
    <Navigate to={routes.loginPagePath()} />
  );
};

export default PrivateRoute;
