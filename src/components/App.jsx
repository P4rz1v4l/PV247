import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';

import { Menu } from './menu/Menu';
import { Chat } from './chat/Chat';

import './app.scss';

library.add(faAlignLeft);

export class App extends React.PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <Chat />
        </div>
      </div>
    );
  }
}
