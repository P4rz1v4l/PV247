import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IChatMessageProps {
    id: string;
    likes: number;
    author: string;
    text: string;
    onLike: (id: string) => void;
    onDislike: (id: string) => void;
    onDeleteMessage: (id: string) => void;
}

export class ChatMessage extends React.PureComponent<IChatMessageProps> {
    render(): JSX.Element {
        return (
            <div className="message d-flex">
                <div className="avatar">
                    <div className="image" />
                </div>
                <div className="body">
                    <div className="icons d-flex">
                        <span>{this.props.likes > 0 ? '+' + this.props.likes.toString() : this.props.likes.toString()}</span>
                        <div className="d-flex align-items-center">
                            <i onClick={() => this.props.onDislike(this.props.id)}><FontAwesomeIcon icon={['far', 'thumbs-down']} /></i>
                            <div />
                            <i onClick={() => this.props.onLike(this.props.id)}><FontAwesomeIcon icon={['far', 'thumbs-up']} /></i>
                        </div>

                        <div className="d-flex align-items-center trash">
                            <i onClick={() => this.props.onDeleteMessage(this.props.id)}><FontAwesomeIcon icon={['fas', 'times']} /></i>
                        </div>
                    </div>
                    <div className="author-name">
                        {this.props.author}
                    </div>
                    <div className="text">
                        {this.props.text}
                    </div>
                    <div className="attachments" />
                </div>
            </div>
        );
    }
}
