import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class ChatInput extends React.PureComponent {
  render() {
    return (
      <div>
        <input type="text" placeholder="Type message" />
        <div className="d-flex">
          <FontAwesomeIcon icon={['fas', 'font']} />
          <FontAwesomeIcon icon={['far', 'smile']} />
          <FontAwesomeIcon icon={['far', 'image']}/>
          <FontAwesomeIcon icon={['far', 'file']}/>
          <FontAwesomeIcon icon={['fas', 'at']}/>

          <svg className="ml-auto" width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.00999999 18L21 9L0.00999999 0L0 7L15 9L0 11L0.00999999 18Z" fill="black"/>
          </svg>
        </div>
      </div>
    );
  }
}
