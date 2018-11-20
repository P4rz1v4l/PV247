import React from 'react';
import ReactHtmlParser from 'react-html-parser';
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
            <span>{this.props.likes > 0 ? '+' + this.props.likes.toString() : this.props.likes}</span>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={['far', 'thumbs-down']} onClick={() => this.props.onDislike(this.props.id)} />
              <div></div>
              <FontAwesomeIcon icon={['far', 'thumbs-up']} onClick={() => this.props.onLike(this.props.id)} />
            </div>

            <div className="d-flex align-items-center trash">
              <FontAwesomeIcon icon={['fas', 'times']} onClick={() => this.props.onDeleteMessage(this.props.id)} />
            </div>
          </div>
          <div className="author-name">
            {this.props.author}
          </div>
          <div className="text">
            {ReactHtmlParser(this.props.text)}
          </div>
          <div className="attachments">
          </div>

        </div>
      </div>
    );
  }
}
