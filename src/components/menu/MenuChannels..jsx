import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <div className="d-flex align-items-stretch justify-content-between channel">
            <div>
              <div className="d-flex align-items-start name">
                <FontAwesomeIcon icon="comments" />
                <div>
                  <h3>name2</h3>
                  <span>1 new message</span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              ...
            </div>
          </div>

          <div className="d-flex align-items-stretch justify-content-between channel">
            <div>
              <div className="d-flex align-items-start">
                <FontAwesomeIcon icon="comments" />
                <div>
                  <h3>name2</h3>
                  <span>1 new message</span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              ...
            </div>
          </div>

          <div className="d-flex align-items-stretch justify-content-between channel active">
            <div>
              <div className="d-flex align-items-start">
                <FontAwesomeIcon icon="comments" />
                <div>
                  <h3>name2</h3>
                  <span>1 new message</span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              ...
            </div>
          </div>
        </div>
      </div>
    );
  }
}
