import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {MessageRecord} from '../../model/stateMessages';
import {IApiMessage} from '../../util/fetchMessageUpdate';
import {memoizeFetchUserInfo} from '../../util/fetchUserInfo';
import {IApiUser} from '../../util/fetchUserUpdate';
import {EditorState, convertFromRaw} from 'draft-js';
// @ts-ignore
import Editor from 'draft-js-plugins-editor';
// @ts-ignore
import createLinkifyPlugin from 'draft-js-linkify-plugin';
// @ts-ignore
import createEmojiPlugin from 'draft-js-emoji-plugin';
// @ts-ignore
import createAutoListPlugin from 'draft-js-autolist-plugin';
// @ts-ignore
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import {createHighlightPlugin} from '../../driftPlugins/highlightPlugin';

interface IChatMessageState {
    nick: string;
    avatar: string;
}

interface IChatMessageOwnProps {
    messageData: MessageRecord;
    actualUser: string;
}

export interface ChatMessageStateToProps {
    messageUpdating: boolean;
    token: string;
}

export interface ChatMessageDispatchToProps {
    updateMessage: (newMessageData: IApiMessage, messageId: string) => void;
    deleteMessage: (id: string) => void;
}

const linkifyPlugin = createLinkifyPlugin();
const autoListPlugin = createAutoListPlugin();
const highlightPlugin = createHighlightPlugin();
const mentionPlugin = createMentionPlugin();
const emojiPlugin = createEmojiPlugin();
const plugins = [autoListPlugin, linkifyPlugin, highlightPlugin, emojiPlugin, mentionPlugin];

export class ChatMessage extends React.PureComponent<IChatMessageOwnProps & ChatMessageStateToProps & ChatMessageDispatchToProps, IChatMessageState> {
    constructor(props: IChatMessageOwnProps & ChatMessageStateToProps & ChatMessageDispatchToProps) {
        super(props);

        this.state = {
            nick: '',
            avatar: '',
        };
    }

    componentDidMount() {
        memoizeFetchUserInfo(this.props.messageData.createdBy, this.props.token)
            .then((data: IApiUser) => {
                this.setState(() => ({nick: data.customData.nick, avatar: data.customData.avatar}));
            })
            .catch(() => {
                console.log('error');
            });
    }

    onChange = (editorState: any) => {
        return editorState;
    };

    onDislike = () => {
        const message: IApiMessage = {
            value: this.props.messageData.value,
            customData: this.props.messageData.customData,
        };

        let index: number = this.props.messageData.customData.dislikes.indexOf(this.props.actualUser);
        if ( index !== -1 ) {
            message.customData.dislikes.splice(index, 1);
        }
        else {
            message.customData.dislikes.push(this.props.actualUser);
        }

        index = this.props.messageData.customData.likes.indexOf(this.props.actualUser);
        if ( index !== -1 ) {
            message.customData.likes.splice(index, 1);
        }

        this.props.updateMessage(message, this.props.messageData.id);
    };

    onLike = () => {
        const message: IApiMessage = {
            value: this.props.messageData.value,
            customData: this.props.messageData.customData,
        };

        let index: number = this.props.messageData.customData.likes.indexOf(this.props.actualUser);
        if ( index !== -1 ) {
            message.customData.likes.splice(index, 1);
        }
        else {
            message.customData.likes.push(this.props.actualUser);
        }

        index = this.props.messageData.customData.dislikes.indexOf(this.props.actualUser);
        if ( index !== -1 ) {
            message.customData.dislikes.splice(index, 1);
        }

        this.props.updateMessage(message, this.props.messageData.id);
    };

    render(): JSX.Element {
        const likes = (this.props.messageData.get('customData').likes.length - this.props.messageData.get('customData').dislikes.length);

        return (
            <div className={likes > 0 ? 'message positive d-flex' : likes < 0 ? 'message negative d-flex' : 'message d-flex'}>
                <div className="avatar">
                    <img src={this.state.avatar ? this.state.avatar : 'media/img/avatar.png'} />
                </div>
                <div className="body">
                    <div className="icons d-flex">
                        <span>{likes > 0 ? '+' + likes.toString() : likes.toString()}</span>
                        <div className="d-flex align-items-center">
                            <i className={this.props.messageData.customData.dislikes.indexOf(this.props.actualUser) !== -1 ? 'dislikeActive' : ''} onClick={this.onDislike}><FontAwesomeIcon icon={['far', 'thumbs-down']} /></i>
                            <div />
                            <i className={this.props.messageData.customData.likes.indexOf(this.props.actualUser) !== -1 ? 'likeActive' : ''} onClick={this.onLike}><FontAwesomeIcon icon={['far', 'thumbs-up']} /></i>
                        </div>

                        {this.props.messageData.createdBy === this.props.actualUser ?
                            <div className="d-flex align-items-center trash">
                                <i onClick={() => this.props.deleteMessage(this.props.messageData.get('id'))}><FontAwesomeIcon icon={['fas', 'times']} /></i>
                            </div>
                            :
                            ''
                        }
                    </div>
                    <div className="author-name">
                        {this.state.nick ? this.state.nick : this.props.messageData.get('createdBy')}
                    </div>
                    <div className="text">
                        <Editor
                            editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.messageData.value)))}
                            onChange={this.onChange}
                            readOnly
                            plugins={plugins}
                        />
                    </div>
                    <div className="attachments">
                        {this.props.messageData.customData.attachments.map((attachment) => {
                            return <a href={attachment.link} key={attachment.link} target="_blank">{attachment.name}</a>;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
