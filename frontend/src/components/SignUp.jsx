import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import routes from '../routes.js';
import { useAuth } from '../hooks/hooks.js';
import registrationAvatar from '../assets/images/reg_avatar.jpg';

const SignUp = () => {
  const { logIn } = useAuth();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, 'Username  must contain at least 3 characters')
      .max(20, 'Username cannot exceed 15 characters')
      .trim()
      .required('Username is a required field'),
    password: yup
      .string()
      .min(6, 'Password  must contain at least 6 characters')
      .max(20, 'Password cannot exceed 15 characters')
      .trim()
      .required('Password is a required field'),
    confirmPassword: yup
      .string()
      .trim()
      .test('confirmPassword', 'must match', (value, context) => value === context.parent.password),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setRegistrationFailed(false);
      setSubmitted(true);
      const { username, password } = values;
      try {
        const response = await axios.post(routes.signUpPath(), { username, password });
        logIn(response.data);
        localStorage.setItem('userId', JSON.stringify(response.data));
        navigate(routes.rootPath());
      } catch(error) {
        console.log(error);
        if (error.response.status === 409) {
          setRegistrationFailed(true);
          inputRef.current.select();
          return;
        }
        throw error;
      }
      setSubmitted(false);
    }
  })

  return(
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={registrationAvatar}
                  className="rounded-circle"
                  alt="Registration Avatar"
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Sign Up</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder='username'
                    name="username"
                    id="username"
                    autoComplete="username"
                    disabled={submitted}
                    isInvalid={
                      (formik.errors.username)
                      || registrationFailed
                    }
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">username</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="min password length"
                    name="password"
                    id="password"
                    aria-describedby="passwordHelpBlock"
                    disabled={submitted}
                    isInvalid={
                      (formik.errors.password)
                      || registrationFailed
                    }
                    required
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="password">password</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    placeholder='must match'
                    name="confirmPassword"
                    id="confirmPassword"
                    disabled={submitted}
                    isInvalid={
                      (formik.errors.confirmPassword)
                      || registrationFailed
                    }
                    required
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {registrationFailed
                      ? 'already exists'
                      : formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="confirmPassword">confirm</Form.Label>

                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100">Submit</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignUp;