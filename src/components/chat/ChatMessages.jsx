import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { ChatMessage } from './ChatMessage';
import {ChatInput} from "./ChatInput";

export class ChatMessages extends React.PureComponent {
  componentDidMount() {
    this._scrollBarRef.scrollTop = this._scrollBarRef.scrollHeight;
  }

  componentDidUpdate() {
    this._scrollBarRef.scrollTop = this._scrollBarRef.scrollHeight;
  }

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
            <PerfectScrollbar
              containerRef={(ref) => {
                this._scrollBarRef = ref;
              }}
            >
              {this.props.messages.map((message) => (
                <ChatMessage
                  key={message.get('id')}
                  id={message.get('id')}
                  author={message.get('author')}
                  text={message.get('text')}
                  likes={message.get('likes')}
                  onLike={this.props.onLike}
                  onDislike={this.props.onDislike}
                />
              ))
              }
            </PerfectScrollbar>
          </div>
          <div className="input">
            <ChatInput
              userName={this.props.user.get('name')}
              onSend={this.props.onSend}
            />
          </div>
        </div>
      </div>
    );
  }
}
