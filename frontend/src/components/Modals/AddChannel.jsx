import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal, FormGroup, FormControl, FormLabel, Button, Form,
} from 'react-bootstrap';
import { useChatApi } from '../../hooks/hooks.js';
import { actions } from '../../slices/slices.js';
import { getChannelNames } from '../../selectors.js';

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

const AddChannel = ({ handleClose }) => {
  const channelNames = useSelector(getChannelNames);
  const chatApi = useChatApi();
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationSchema(channelNames),
    onSubmit: async (values) => {
      const channel = {
        name: values.name,
      };
      const data = await chatApi.addChannel(channel);
      dispatch(actions.setActiveChannel(data.id));
      handleClose();
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return(
    <>
      <Modal.Header closeButton={handleClose}>
        <Modal.Title>Add Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className="mb-2"
              ref={inputRef}
              id="name"
              name="name"
              required=""
              onChange={formik.handleChange}
              value={formik.values.name}
              disabled={formik.isSubmitting}
              isInvalid={!!formik.errors.name}
            />
            <FormLabel htmlFor="name" className="visually-hidden">Channel name</FormLabel>
            <FormControl.Feedback type="invalid">
              {formik.errors.name || formik.status}
            </FormControl.Feedback>
            <Modal.Footer>
              <Button variant="secondary" type="button" onClick={handleClose}>Cancel</Button>
              <Button variant="primary" type="submit" 
                disabled={formik.isSubmitting} onClick={formik.handleSubmit}>Add</Button>
            </Modal.Footer>
          </FormGroup>
        </Form>
      </Modal.Body>
    </>
  )
};

export default AddChannel;
