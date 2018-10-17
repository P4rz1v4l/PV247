import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class MenuChannelsListItem extends React.PureComponent {
  render() {
    return (
      <div className={this.props.active ? 'd-flex align-items-stretch justify-content-between channel active' : 'd-flex align-items-stretch justify-content-between channel'}>
        <div>
          <div className="d-flex align-items-start name">
            <FontAwesomeIcon icon="comments" />
            <div>
              <h3>{ this.props.name }</h3>
              <span>1 new message</span>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center move">
          ...
        </div>
      </div>
    );
  }
}
