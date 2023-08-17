import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getActiveChannel, getActiveChannelMessages } from '../selectors.js';
import Message from './Message.jsx';
import NewMessageForm from './NewMessageForm.jsx';

const MessagesBox = () => {
  const channel = useSelector(getActiveChannel);
  const messages = useSelector(getActiveChannelMessages);

  const messagesView = useRef(null);
  useEffect(() => {
    messagesView.current?.lastElementChild?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className='d-flex flex-column h-100'>
      <div className='bg-light mb-4 p-3 shadow-sm small'>
        <p className='m-0'>
          <b>{`# ${channel?.name}`}</b>
        </p>
        <span className='text-muted'>{`${messages.length} сообщений`}</span>
      </div>
      <div
        id='messages-box'
        className='chat-messages overflow-auto px-5'
        ref={messagesView}
      >
        {messages.map(({ id, username, body }) => (
          <Message key={id} username={username} body={body} />
        ))}
      </div>
      <div className='mt-auto px-5 py-3'>
        <NewMessageForm channel={channel} />
      </div>
    </div>
  );
};

export default MessagesBox;
