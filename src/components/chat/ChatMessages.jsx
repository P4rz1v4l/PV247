import React from 'react';

import { ChatMessage } from './ChatMessage';
import {ChatInput} from "./ChatInput";

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
            {this.props.messages.map((message) => (
              <ChatMessage
                key={message.id}
                id={message.id}
                author={message.author}
                text={message.text}
                likes={message.likes}
                onLike={this.props.onLike}
                onDislike={this.props.onDislike}
              />
            ))
            }
          </div>
          <div className="input">
            <ChatInput
              userName={this.props.user.name}
              onSend={this.props.onSend}
            />
          </div>
        </div>
      </div>
    );
  }
}
