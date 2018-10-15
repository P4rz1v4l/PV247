import React from 'react';

export class MenuChannels extends React.PureComponent {
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
          <div className="channel"></div>
        </div>
      </div>
    );
  }
}
