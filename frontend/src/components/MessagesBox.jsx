import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getActiveChannel, getActiveChannelMessages } from '../selectors.js';
import Message from './Message.jsx';
import NewMessageForm from './NewMessageForm.jsx';

const MessagesBox = () => {
  const channel = useSelector(getActiveChannel);
  const messages = useSelector(getActiveChannelMessages);
  const messagesView = useRef(null);
  const { t } = useTranslation();
  const scrollToBottom = (element) => {
    element.scrollTo(0, element.scrollHeight);
  };

  useEffect(() => {
    scrollToBottom(messagesView.current);
  }, [messages]);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${channel?.name}`}</b>
        </p>
        <span className="text-muted">
          {`${messages.length} ${t('chat.messageCount', { count: messages.length })}`}
        </span>
      </div>
      <div
        id="messages-box"
        className="chat-messages overflow-auto px-5"
        ref={messagesView}
      >
        {messages.map(({ username, body, id }) => (
          <Message key={id} username={username} body={body} />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <NewMessageForm channel={channel} />
      </div>
    </div>
  );
};

export default MessagesBox;
