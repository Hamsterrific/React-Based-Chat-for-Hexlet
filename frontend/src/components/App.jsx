import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import PrivateRoute from './PrivatePage.jsx';
import routes from '../routes.js';
import Header from './Header.jsx';

const App = () => {
  return (
    <div className='h-100'>
      <div className='d-flex flex-column h-100'>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path={routes.rootPath()} element={<PrivateRoute />} />
            <Route path={routes.loginPagePath()} element={<Login />} />
            <Route path={routes.signUpPagePath()} element={<SignUp />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
