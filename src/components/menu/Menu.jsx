import React from 'react';

import { MenuHeader } from "./MenuHeader.";
import { MenuChannels } from "./MenuChannels.";

import './menu.scss';

export class Menu extends React.PureComponent {
  render() {
    return (
      <div id="menu" className="col-md-3 col-xl-2 col-12">
        <div className="row">
          <div className="col-12">
            <MenuHeader />
          </div>
          <div className="col-12">
            <MenuChannels />
          </div>
        </div>
      </div>
    );
  }
}
