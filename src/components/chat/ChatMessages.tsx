import * as React from 'react';
import * as Immutable from 'immutable';
// @ts-ignore
import ScrollArea from 'react-scrollbar';

import { ChatMessage } from './ChatMessage';
import {ChatInput} from './ChatInput';

export interface IChatMessagesStateProps {
    messages: Immutable.List<Immutable.Map<any, any>>;
    user: Immutable.Map<any, any>;
}

export interface IChatMessagesDispatchProps {
    onLike: (id: string) => void;
    onDislike: (id: string) => void;
    onSend: (author: string, text: string) => void;
    onDeleteMessage: (id: string) => void;
}

interface IChatMessagesState {
    scroll: boolean;
}

export class ChatMessages extends React.PureComponent<IChatMessagesStateProps & IChatMessagesDispatchProps, IChatMessagesState> {
    _scrollBarRef: any;

    constructor(props: IChatMessagesStateProps & IChatMessagesDispatchProps) {
        super(props);
        this.state = {
            scroll: false
        };
    }

    componentDidMount() {
        this._scrollBarRef.scrollArea.refresh();
        this._scrollBarRef.scrollArea.scrollYTo(this._scrollBarRef.state.realHeight);
    }

    componentDidUpdate() {
        if (this.state.scroll) {
            this._scrollBarRef.scrollArea.refresh();
            this._scrollBarRef.scrollArea.scrollYTo(this._scrollBarRef.state.realHeight);
            this.setState(() => ({scroll: false}));
        }
    }

    onSend = (author: string, text: string) => {
        this.setState(() => ({scroll: true}));
        this.props.onSend(author, text);
    };

    render() {
        return (
            <div className="col-12 messages-container">
                <div className="title">
                    <h4>
                        <span>Conversation</span>
                        <div className="highlight-line"/>
                    </h4>
                </div>
                <div className="body d-flex align-content-between flex-wrap">
                    <div className="messages">
                        <ScrollArea ref={(ref: any) => {
                            this._scrollBarRef = ref;
                        }}>
                            {this.props.messages.map((message: Immutable.Map<any, any>) => (
                                <ChatMessage
                                    key={message.get('id')}
                                    id={message.get('id')}
                                    author={message.get('author')}
                                    text={message.get('text')}
                                    likes={message.get('likes')}
                                    onLike={this.props.onLike}
                                    onDislike={this.props.onDislike}
                                    onDeleteMessage={this.props.onDeleteMessage}
                                />
                            ))}
                        </ScrollArea>
                    </div>
                    <div className="input">
                        <ChatInput
                            userName={this.props.user.get('name')}
                            onSend={this.onSend}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
