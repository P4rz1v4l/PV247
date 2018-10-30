import React from 'react';
import Sidebar from "react-sidebar";

import { ChatHeader } from "./ChatHeader.";
import { ChatMessages } from "./ChatMessages.";
import { ChatInfos } from "./ChatInfos.";

import './chat.scss';

const mql = window.matchMedia(`(min-width: 1200px)`);

export class Chat extends React.PureComponent {
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
      <div id="chat" className="col-12">
        <div className="row align-content-start">
          <Sidebar
            sidebar={<ChatInfos />}
            open={this.state.sidebarOpen}
            docked={this.state.sidebarDocked}
            onSetOpen={this.onSetSidebarOpen}
            pullRight={true}
          >
            <ChatHeader />
            <ChatMessages />
          </Sidebar>
        </div>
      </div>
    );
  }
}
