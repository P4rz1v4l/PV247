import React from 'react';
// import { Map } from 'immutable';
import { MenuChannelsListItem } from './MenuChannelsListItem';

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
          {this.props.channels.map((channel) => (
            <MenuChannelsListItem
              key={channel.get('id')}
              name={channel.get('name')}
              active={(channel.get('id') === this.props.app.get('actualChannelId'))}
            />
          ))
          }
        </div>
      </div>
    );
  }
}
