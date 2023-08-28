import React, { useEffect, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAuth, useChatApi } from '../hooks/hooks.js';

const NewMessageForm = ({channel}) => {
  const { username } = useAuth();
  const chatApi = useChatApi();
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object().shape({
      body: yup.string().trim().required(),
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
          aria-label={t('chat.newMessage')}
          disabled={formik.isSubmitting}
          placeholder={t('chat.enterMessage')}
          className="border-0 p-0 ps-2"
        />
        <Button variant="group-vertical" type="submit">
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{t('chat.sendMessage')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;
