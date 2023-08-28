import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl, FormLabel, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useChatApi } from '../../hooks/hooks.js';
import { getChannelNames, getChannelById } from '../../selectors.js';

const validationSchema = (channels) =>
  yup.object().shape({
    name: yup
      .string()
      .trim()
      .required('Required')
      .min(3, 'Min')
      .max(20, 'Max')
      .notOneOf(channels, 'Duplicate name'),
  });

const RenameChannel = ({ handleClose }) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  useEffect(() => {
    setTimeout(() => {
      inputRef.current.select();
    }, 1);
  }, []);
  const chatApi = useChatApi();

  const channelNames = useSelector(getChannelNames);
  const channelId = useSelector((state) => state.modal.id);
  const channel = useSelector(getChannelById(channelId));

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: validationSchema(channelNames),
    onSubmit: async (values) => {
      const { name } = values;
      await chatApi
        .renameChannel({ name, id: channelId })
        .then(() => {
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className='mb-2'
              ref={inputRef}
              name='name'
              id='name'
              required=''
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
            />
            <FormLabel htmlFor='name' className='visually-hidden'>
            {t('modals.channelName')}
            </FormLabel>
            <FormControl.Feedback type='invalid'>
              {formik.errors.name || formik.status}
            </FormControl.Feedback>
            <Modal.Footer>
              <Button variant='secondary' type='button' onClick={handleClose}>
              {t('modals.cancelButton')}
              </Button>
              <Button
                variant='primary'
                type='submit'
                disabled={formik.isSubmitting}
                onClick={formik.handleSubmit}
              >
                {t('modals.renameButton')}
              </Button>
            </Modal.Footer>
          </FormGroup>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RenameChannel;
