import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';

import { Menu } from './menu/Menu';
import { Chat } from './chat/Chat';

library.add(faAlignLeft);

export class App extends React.PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div id="menu" className="col-lg-2 col-12">
            <Menu />
          </div>
          <div className="col-lg-10 col-12">
            <Chat />
          </div>
        </div>
      </div>
    );
  }
}
