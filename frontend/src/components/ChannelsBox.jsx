import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import Channel from './Channel.jsx';
//import { actions } from '../slices/slices.js';

const ChannelsBox = () => {
  const channelsInfo = useSelector((state) => state.channelsInfo);
  const { channels } = channelsInfo;
  //    const dispatch = useDispatch();
  const channelsView = useRef(null);

  useEffect(() => {
    channelsView.current?.lastElementChild?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [channelsInfo.channels.length]);

  return (
    <>
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>Каналы</b>
        <Button
          type='button'
          variant='group-vertical'
          className='p-0 text-primary'
        >
          <PlusSquare size={20} />
          <span className='visually-hidden'>+</span>
        </Button>
      </div>
      <ul
        id='channels-box'
        className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'
        ref={channelsView}
      >
        {channels.map((channel) => (
          <Channel key={channel.id} channel={channel} />
        ))}
      </ul>
    </>
  );
};

export default ChannelsBox;
