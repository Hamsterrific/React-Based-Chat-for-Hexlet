import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions } from '../slices/slices.js';

const Channel = ({ channel }) => {
  const { name, id, removable } = channel;
  const { setActiveChannel } = actions;
  const { activeChannelId } = useSelector((state) => state.channelsInfo);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const variant = id === activeChannelId ? 'secondary' : null;

  const handleSelectChannel = (channelId) => {
    dispatch(setActiveChannel(channelId));
  };

  const handleDeleteChannel = (channelId) => {
    dispatch(actions.openModal({ type: 'deleteChannel', id: channelId }));
  };
  const handleRenameChannel = (channelId) => {
    dispatch(actions.openModal({ type: 'renameChannel', id: channelId }));
  };

  return (
    <li key={id} className="nav-item w-100">
      {removable ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            type="button"
            key={id}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={() => handleSelectChannel(id)}
            variant={variant}
          >
            <span className="me-1">#</span>
            {name}
          </Button>
          <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
            <span className="visually-hidden">{t('chat.manageChannel')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleDeleteChannel(id)}>
              {t('chat.deleteChannel')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleRenameChannel(id)}>
              {t('chat.renameChannel')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          type="button"
          variant={variant}
          key={id}
          className="w-100 rounded-0 text-start"
          onClick={() => handleSelectChannel(id)}
        >
          <span className="me-1">#</span>
          {name}
        </Button>
      )}
    </li>
  );
};

export default Channel;
