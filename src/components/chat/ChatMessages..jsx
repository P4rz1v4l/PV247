import React from 'react';

import { ChatMessage } from './ChatMessage.';
import {ChatInput} from "./ChatInput.";

export class ChatMessages extends React.PureComponent {
  render() {
    return (
      <div className="col-12 messages-container">
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
            <ChatInput/>
          </div>
        </div>
      </div>
    );
  }
}
