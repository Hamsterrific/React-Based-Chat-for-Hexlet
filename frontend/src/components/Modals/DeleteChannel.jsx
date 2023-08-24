import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useChatApi } from '../../hooks/hooks.js';

const DeleteChannel = ({ handleClose }) => {
  const chatApi = useChatApi();
  const channelId = useSelector((state) => state.modal.id);
  const handleDelete = async () => {
    await chatApi.deleteChannel({id: channelId})
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Delete Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='lead'>Delete channel?</p>
        <Modal.Footer>
          <Button
            variant='secondary'
            className='me-2'
            type='button'
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant='danger' type='button' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </>
  );
};

export default DeleteChannel;
