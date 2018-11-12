import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class ChatInput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {value: ''};
  }

  updaeInput = (event) => {
    const value = event.target.value;

    this.setState({value});
  };

  keyPressed = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.send();
    }
  };

  send = () => {
    this.props.onSend(this.props.userName, this.state.value);
    this.setState({value: ''});
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Type message" value={this.state.value} onChange={this.updaeInput} onKeyPress={this.keyPressed} />
        <div className="d-flex">
          <FontAwesomeIcon icon={['fas', 'font']} />
          <FontAwesomeIcon icon={['far', 'smile']} />
          <FontAwesomeIcon icon={['far', 'image']}/>
          <FontAwesomeIcon icon={['far', 'file']}/>
          <FontAwesomeIcon icon={['fas', 'at']}/>

          <svg
            className="ml-auto"
            width="21"
            height="18"
            viewBox="0 0 21 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={this.send}
          >
            <path d="M0.00999999 18L21 9L0.00999999 0L0 7L15 9L0 11L0.00999999 18Z" fill="black"/>
          </svg>
        </div>
      </div>
    );
  }
}
