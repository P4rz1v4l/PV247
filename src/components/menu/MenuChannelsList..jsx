import React from 'react';

import { MenuChannelsListItem } from './MenuChannelsListItem.';

export class MenuChannelsList extends React.PureComponent {
  render() {
    return (
      <div className="channels">
        <div className="d-flex justify-content-between title">
          <h2 className="d-flex align-items-center">
            Channels
          </h2>
          <span>+</span>
        </div>
        <div className="list">
          <MenuChannelsListItem name={'Custom name'} />
          <MenuChannelsListItem name={'Kovo Sipox'} />
          <MenuChannelsListItem name={'NullNull'} active={true} />
        </div>
      </div>
    );
  }
}
