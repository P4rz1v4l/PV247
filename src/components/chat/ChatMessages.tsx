import * as React from 'react';
// @ts-ignore
import ScrollArea from 'react-scrollbar';

import {StateMessages, MessageRecord} from '../../model/stateMessages';
import {ChatMessageContainer} from '../../containers/ChatMessage';
import {BeatLoader} from 'react-spinners';
import {ChatInputContainer} from '../../containers/ChatInput';

export interface IChatMessagesStateToProps {
    messages: StateMessages;
    messagesLoading: boolean;
    actualUser: string;
}

export interface IChatMessagesDispatchToProps {
    updateLoadedMessages: () => void;
}

interface IChatMessagesState {
    scroll: boolean;
}

export class ChatMessages extends React.PureComponent<IChatMessagesStateToProps & IChatMessagesDispatchToProps, IChatMessagesState> {
    _scrollBarRef: any;
    _messageUpdater: any;

    constructor(props: IChatMessagesStateToProps & IChatMessagesDispatchToProps) {
        super(props);
        this.state = {
            scroll: true
        };
    }

    componentDidMount() {
        this._scrollBarRef.scrollArea.refresh();
        this._scrollBarRef.scrollArea.scrollYTo(this._scrollBarRef.state.realHeight);
        this._messageUpdater = setInterval(this.props.updateLoadedMessages, 333);
    }

    componentDidUpdate() {
        this._scrollBarRef.scrollArea.refresh();
        this._scrollBarRef.scrollArea.scrollYTo(this._scrollBarRef.state.realHeight);
    }

    componentWillUnmount() {
        clearInterval(this._messageUpdater);
    }

    setScroll = (scroll: boolean) => {
        this.setState(() => ({scroll}));
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
                            {this.props.messagesLoading ?
                                <BeatLoader color={'#f15066'} className={'loader'} />
                                :
                                this.props.messages.valueSeq().map((message: MessageRecord) => (
                                <ChatMessageContainer
                                    key={message.id}
                                    messageData={message}
                                    actualUser={this.props.actualUser}
                                />
                            ))}
                        </ScrollArea>
                    </div>
                    <div className="input">
                        <ChatInputContainer />
                    </div>
                </div>
            </div>
        );
    }
}
