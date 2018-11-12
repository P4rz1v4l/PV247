import React from 'react';

import { ChatMessage } from './ChatMessage';
import {ChatInput} from "./ChatInput";
import {MenuChannelsListItem} from "../menu/MenuChannelsListItem";

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
                author={message.author}
                text={message.text}
                likes={message.likes}
              />
            ))
            }
          </div>
          <div className="input">
            <ChatInput/>
          </div>
        </div>
      </div>
    );
  }
}
