import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class ChatMessage extends React.PureComponent {
  render() {
    return (
      <div className="message d-flex">
        <div className="avatar">
          <div className="image">

          </div>
        </div>
        <div className="body">
          <div className="icons d-flex">
            <span>+9</span>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={['far', 'thumbs-down']} />
              <div></div>
              <FontAwesomeIcon icon={['far', 'thumbs-up']} />
            </div>
          </div>
          <div className="author-name">
            Meno
          </div>
          <div className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="attachments">
          </div>

        </div>
      </div>
    );
  }
}
