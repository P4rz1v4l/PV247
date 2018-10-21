import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faComments, faFont, faAt } from '@fortawesome/free-solid-svg-icons';
import { faStar, faThumbsUp, faThumbsDown, faSmile, faImage, faFile } from '@fortawesome/free-regular-svg-icons';

import { Menu } from './menu/Menu';
import { Chat } from './chat/Chat';

import './app.scss';

library.add(faCog, faComments, faStar, faThumbsUp, faThumbsDown, faFont, faSmile, faImage, faFile, faAt);

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
