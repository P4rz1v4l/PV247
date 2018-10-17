import React from 'react';

export class ChatInfos extends React.PureComponent {
  render() {
    return (
      <div className="col-lg-9 col-xl-4 col-12 channel-info">
        <div className="title">
          <h4>
            <span>Users</span>
            <div className="highlight-line"></div>
          </h4>
          <h4>
            <span>Files</span>
          </h4>
        </div>
      </div>
    );
  }
}
