import React from 'react';
import Sidebar from "react-sidebar";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from "../reducers/rootReducer";
import { initialState } from "../constants/initialState";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faComments, faFont, faAt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faStar, faThumbsUp, faThumbsDown, faSmile, faImage, faFile } from '@fortawesome/free-regular-svg-icons';

import { Menu } from './menu/Menu';
import { Chat } from './chat/Chat';

import './app.scss';

library.add(faCog, faComments, faStar, faThumbsUp, faThumbsDown, faFont, faSmile, faImage, faFile, faAt, faTimes);

const mql = window.matchMedia(`(min-width: 800px)`);

const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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
      <Provider store={store}>
        <Sidebar
          sidebar={<Menu />}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={{sidebar: {width: '270px'}}}
        >
          <div className="container-fluid">
            <div className="row">
              <Chat />
            </div>
          </div>
        </Sidebar>
      </Provider>
    );
  }
}
