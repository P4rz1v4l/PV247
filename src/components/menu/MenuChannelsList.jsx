import React from 'react';
import { Map } from 'immutable';
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
              key={channel.id}
              name={channel.name}
              active={(channel.id === this.props.app.actualChannelId)}
            />
          ))
          }
        </div>
      </div>
    );
  }
}
