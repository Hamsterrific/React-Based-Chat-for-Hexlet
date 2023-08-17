import React from 'react';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './slices/slices.js';
import AuthProvider from './contexts/AuthProvider.jsx';

const init = () => {
  const store = configureStore({
    reducer,
  });
  const vdom = (
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  );

  return vdom;
};

export default init;
