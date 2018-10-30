import React from 'react';

import { MenuHeader } from "./MenuHeader.";
import { MenuChannelsList } from "./MenuChannelsList.";

import './menu.scss';

export class Menu extends React.PureComponent {
  render() {
    return (
      <div id="menu" className="col-12">
        <div className="row">
          <div className="col-12">
            <MenuHeader />
          </div>
          <div className="col-12">
            <MenuChannelsList />
          </div>
        </div>
      </div>
    );
  }
}
