import React from 'react';
import Sidebar from "react-sidebar";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faComments, faFont, faAt } from '@fortawesome/free-solid-svg-icons';
import { faStar, faThumbsUp, faThumbsDown, faSmile, faImage, faFile } from '@fortawesome/free-regular-svg-icons';

import { Menu } from './menu/Menu';
import { Chat } from './chat/Chat';

import './app.scss';

library.add(faCog, faComments, faStar, faThumbsUp, faThumbsDown, faFont, faSmile, faImage, faFile, faAt);

const mql = window.matchMedia(`(min-width: 800px)`);

export class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  };

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  };

  render() {
    return (
      <Sidebar
        sidebar={<Menu />}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
      >
        <div className="container-fluid">
          <div className="row">
            <Chat />
          </div>
        </div>
      </Sidebar>
    );
  }
}
