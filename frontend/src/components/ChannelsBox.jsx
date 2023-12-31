import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { animateScroll } from 'react-scroll';
import Channel from './Channel.jsx';
import { actions, defaultChannelId } from '../slices/slices.js';
import Modal from './Modals/Modal.jsx';

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels, activeChannelId } = useSelector((state) => state.channelsInfo);
  const inputRef = useRef(null);
  const lastChannelsItemId = channels.at(-1)?.id;

  useEffect(() => {
    const animateScrollOptions = { containerId: 'channels-list', delay: 0, offset: 50 };
    if (activeChannelId === defaultChannelId) {
      animateScroll.scrollToTop(animateScrollOptions);
    }
    if (activeChannelId === lastChannelsItemId) {
      animateScroll.scrollToBottom(animateScrollOptions);
    }
  }, [activeChannelId, lastChannelsItemId]);

  const handleAddChannel = () => {
    dispatch(actions.openModal({ type: 'addChannel' }));
  };

  return (
    <>
      <Modal />
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={handleAddChannel}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        ref={inputRef}
      >
        {channels.map((channel) => (
          <Channel channel={channel} key={channel.id} />
        ))}
      </ul>
    </>
  );
};

export default ChannelsBox;
