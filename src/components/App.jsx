import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faComments } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import { Menu } from './menu/Menu';
import { Chat } from './chat/Chat';

import './app.scss';

library.add(faCog, faComments, faStar);

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
