import React from 'react';

import { ChatInfo} from "./ChatInfo.";

export class Chat extends React.PureComponent {
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <ChatInfo />
        </div>
      </div>
    );
  }
}
