import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { actions } from '../../slices/slices.js';
import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import DeleteChannel from './DeleteChannel.jsx';

const mapping = {
  addChannel: AddChannel,
  deleteChannel: DeleteChannel,
  renameChannel: RenameChannel,
};

const Modal = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.modal.isOpened);

  const handleClose = () => {
    dispatch(actions.closeModal());
  };
  const modalType = useSelector((state) => state.modal.type);

  const Component = mapping[modalType];

  return (
    <BootstrapModal show={isOpened} onHide={handleClose} centered>
      {Component && <Component handleClose={handleClose} />}
    </BootstrapModal>
  );
};

export default Modal;
