import React from 'react';

import { ChatMessage } from './ChatMessage.';

export class ChatMessages extends React.PureComponent {
  render() {
    return (
      <div className="col-md-9 col-xl-8 col-12 messages-container">
        <div className="title">
          <h4>
            <span>Conversation</span>
            <div className="highlight-line"></div>
          </h4>
        </div>
        <div className="body d-flex align-content-between flex-wrap">
          <div className="messages">
            <ChatMessage />
            <ChatMessage />
          </div>
          <div className="input">
            sdas
          </div>
        </div>
      </div>
    );
  }
}
