import React, { useEffect, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth, useChatApi } from '../hooks/hooks.js';

const NewMessageForm = ({channel}) => {
  const { username } = useAuth();
  const chatApi = useChatApi();
  const inputRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object().shape({
      body: yup.string().trim().required('Required'),
    }),
    onSubmit: async (values) => {
      const message = {
        body: values.body,
        channelId: channel.id,
        username,
      };
      await chatApi.addMessage(message);
      formik.resetForm();
    },
  });
  useEffect(() => {
    inputRef.current.focus();
  }, [channel, formik.isSubmitting]);

  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
      <InputGroup>
        <Form.Control
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
          name="body"
          aria-label='Сообщение'
          disabled={formik.isSubmitting}
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2"
        />
        <Button variant="group-vertical" type="submit">
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;
