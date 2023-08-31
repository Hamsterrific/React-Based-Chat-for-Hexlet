import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import PrivateRoute from './PrivatePage.jsx';
import routes from '../routes.js';
import Header from './Header.jsx';

const App = () => (
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
    <ToastContainer
      position='top-right'
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
  </div>
);

export default App;
