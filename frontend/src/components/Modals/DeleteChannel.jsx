import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useChatApi } from '../../hooks/hooks.js';

const DeleteChannel = ({ handleClose }) => {
  const chatApi = useChatApi();
  const { t } = useTranslation();
  const channelId = useSelector((state) => state.modal.id);
  const handleDelete = async () => {
    await chatApi
      .deleteChannel({ id: channelId })
      .then(() => {
        toast.success(t('toast.deletedChannel'));
        handleClose();
      })
      .catch(() => {
        toast.error(t('toast.dataError'));
      });
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='lead'>{t('modals.confirmation')}</p>
        <Modal.Footer>
          <Button
            variant='secondary'
            className='me-2'
            type='button'
            onClick={handleClose}
          >
            {t('modals.cancelButton')}
          </Button>
          <Button variant='danger' type='button' onClick={handleDelete}>
            {t('modals.deleteButton')}
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </>
  );
};

export default DeleteChannel;
