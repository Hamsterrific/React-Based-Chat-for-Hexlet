import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import routes from '../routes.js';
import loginImage from '../assets/images/login.jpg';
import { useAuth } from '../hooks/hooks.js';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const auth = useAuth();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required(t('login.required')),
      password: yup.string().required(t('login.required')),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        auth.logIn(response.data);
        navigate(routes.rootPath());
      } catch (error) {
        formik.setSubmitting(false);

        if (!error.isAxiosError) {
          toast.error(t('toast.unknownError'));
          return;
        }

        if (error.response?.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        toast.error(t('toast.connectionError'));
      }
    },
  });

  return (
    <div className='container-fluid h-100'>
      <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <div className='card shadow-sm'>
            <div className='card-body row p-5'>
              <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                <img
                  style={{ pointerEvents: 'none' }}
                  src={loginImage}
                  className='rounded-circle'
                  alt={t('login.header')}
                  width='250px'
                />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className='col-12 col-md-6 mt-3 mt-mb-0'
              >
                <h1 className='text-center mb-4'>{t('login.header')}</h1>
                <Form.Group className='form-floating mb-3'>
                  <Form.Control
                    name='username'
                    autoComplete='username'
                    required
                    placeholder={t('login.username')}
                    id='username'
                    className='form-control'
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    ref={inputRef}
                    isInvalid={authFailed}
                  />
                  <Form.Label htmlFor='username'>
                    {t('login.username')}
                  </Form.Label>
                </Form.Group>
                <Form.Group className='form-floating mb-4'>
                  <Form.Control
                    name='password'
                    autoComplete='current-password'
                    required
                    placeholder={t('login.password')}
                    type='password'
                    id='password'
                    className='form-control'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authFailed}
                  />
                  <Form.Label className='form-label' htmlFor='password'>
                    {t('login.password')}
                  </Form.Label>
                  {authFailed && (
                    <Form.Control.Feedback
                      type='invalid'
                      className='invalid-feedback'
                      tooltip
                    >
                      {t('login.wrongCredentials')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button
                  type='submit'
                  className='w-100 mb-3'
                  variant='outline-primary'
                >
                  {t('login.submit')}
                </Button>
              </Form>
            </div>
            <div className='card-footer p-4'>
              <div className='text-center'>
                <span>{t('login.noAccount')}</span>
                {' '}
                <Link to={routes.signUpPagePath()}>{t('login.signUp')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
