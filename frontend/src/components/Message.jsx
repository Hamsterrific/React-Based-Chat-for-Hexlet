import React from 'react';

// eslint-disable-next-line react/prop-types
const Message = ({ username, body }) => (
    <div className="text-break mb-2">
      <b>{username}</b>
      {': '}
      {body}
    </div>
  );

  export default Message;