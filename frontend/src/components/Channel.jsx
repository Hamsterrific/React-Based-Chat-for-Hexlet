import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button, ButtonGroup, Dropdown,
  } from 'react-bootstrap';
import { actions } from '../slices/slices.js';

// eslint-disable-next-line react/prop-types
const Channel = ({channel}) => {
    // eslint-disable-next-line react/prop-types
    const { name, id, removable } = channel;
    const { setActiveChannel } = actions;
    const { activeChannelId } = useSelector((state) => state.channelsInfo);
    const dispatch = useDispatch();
    const variant = id === activeChannelId  ? 'secondary' : null;

    const handleSelect = (channelId) => {
        dispatch(setActiveChannel(channelId));
    };

    return (
        <li key={id} className="nav-item w-100">
          {removable
            ? (
              <Dropdown as={ButtonGroup} className="d-flex">
                <Button
                  type="button"
                  key={id}
                  className="w-100 rounded-0 text-start text-truncate"
                  onClick={() => handleSelect(id)}
                  variant={variant}
                >
                  <span className="me-1">#</span>
                  {name}
                </Button>
                <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
                  <span className="visually-hidden">Управление каналом</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Удалить</Dropdown.Item>
                  <Dropdown.Item>Переименовать</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )
            : (
              <Button
                type="button"
                variant={variant}
                key={id}
                className="w-100 rounded-0 text-start"
                onClick={() => handleSelect(id)}
              >
                <span className="me-1">#</span>
                {name}
              </Button>
            )}
        </li>
      );
}

export default Channel;