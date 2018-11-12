import React from 'react';

export class MenuHeader extends React.PureComponent {
  render() {
    return (
      <div className="d-flex align-items-stretch justify-content-between header">
        <div>
          <h1>boria</h1>
          <span>borokoso@gmail.com</span>
        </div>
        <div className="d-flex align-items-center">
          <div className="avatar"></div>
        </div>
      </div>
    );
  }
}
