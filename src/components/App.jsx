import React from 'react';

import { Menu } from './menu/Menu';
import { Chat } from './chat/Chat';

export class App extends React.PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div id="menu" className="col-12 col-lg-3">
            <Menu />
          </div>
          <div className="col-9 col-lg-9">
            <Chat />
          </div>
        </div>
      </div>
    );
  }
}
