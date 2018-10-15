import React from 'react';

import { ChatHeader } from "./ChatHeader.";
import { ChatMessages } from "./ChatMessages.";
import { ChatInfos } from "./ChatInfos.";

export class Chat extends React.PureComponent {
  render() {
    return (
      <div id="chat" className="col-md-9 col-xl-10 col-12">
        <div className="row">
          <div className="col-12">
            <ChatHeader />
          </div>
          <div className="col-lg-9 col-xl-8 col-12">
            <ChatMessages />
          </div>
          <div className="col-lg-9 col-xl-4 col-12">
            <ChatInfos />
          </div>
        </div>
      </div>
    );
  }
}
