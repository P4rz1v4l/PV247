import React from 'react';

import { ChatHeader } from "./ChatHeader.";
import { ChatMessages } from "./ChatMessages.";
import { ChatInfos } from "./ChatInfos.";

import './chat.scss';

export class Chat extends React.PureComponent {
  render() {
    return (
      <div id="chat" className="col-md-9 col-xl-10 col-12">
        <div className="d-flex flex-row align-content-start flex-wrap">
            <ChatHeader />

            <ChatMessages />

            <ChatInfos />
        </div>
      </div>
    );
  }
}
