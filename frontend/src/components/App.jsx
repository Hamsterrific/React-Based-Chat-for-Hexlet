import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import PrivateRoute from './PrivatePage.jsx';
import routes from '../routes.js';

const App = () => {
  return (
    <div className='h-100'>
      <div className='d-flex flex-column h-100'>
        <BrowserRouter>
          <Routes>
            <Route path={routes.rootPath()} element={<PrivateRoute />} />
            <Route path={routes.loginPagePath()} element={<Login />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
