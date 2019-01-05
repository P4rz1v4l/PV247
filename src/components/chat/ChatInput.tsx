import * as React from 'react';
import * as Immutable from 'immutable';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {BeatLoader} from 'react-spinners';
import {EditorState, RichUtils, convertToRaw, ContentState} from 'draft-js';
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
import {IMessageCustomDataAttachments} from '../../model/stateMessages';
import {getDownloadLink, IApiFileInfo, IApiFileUri, uploadFile} from '../../util/uploadFile';

interface IMention {
    name: string;
}

interface IChatInputState {
    editorState: any;
    suggestions: IMention[];
    attachments: Immutable.List<IMessageCustomDataAttachments>;
}

export interface IChatInputStateToProps {
    messageSending: boolean;
    mentions: IMention[];
    token: string;
}

export interface IChatInputDispatchToProps {
    onSend: (value: string, attachments: IMessageCustomDataAttachments[]) => void;
    errorAdd: (text: string) => void;
}

const linkifyPlugin = createLinkifyPlugin();
const autoListPlugin = createAutoListPlugin();
const highlightPlugin = createHighlightPlugin();
const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [autoListPlugin, linkifyPlugin, highlightPlugin, emojiPlugin, mentionPlugin];

export class ChatInput extends React.PureComponent<IChatInputDispatchToProps & IChatInputStateToProps, IChatInputState> {
    private refEditor: any;
    private refFileInput: HTMLInputElement;

    constructor(props: IChatInputDispatchToProps & IChatInputStateToProps) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            suggestions: this.props.mentions,
            attachments: Immutable.List([]),
        };
    }

    onChange = (editorState: any) => {
        this.setState((oldState) => ({
            ...oldState,
            editorState
        }));
    };

    onBoldClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD')
        );
    };

    onItalicClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC')
        );
    };

    onUnderlineClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE')
        );
    };

    onStrikeThroughClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH')
        );
    };

    onHighlightClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, 'HIGHLIGHT')
        );
    };

    handleKeyCommand = (command: string) => {
        const newState = RichUtils.handleKeyCommand(
            this.state.editorState,
            command
        );
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    onSearchChange = ({value}: any) => {
        const mentions = this.props.mentions;

        this.setState((oldState) => ({
            ...oldState,
            suggestions: defaultSuggestionsFilter(value, mentions),
        }));
    };

    focus = () => {
        this.refEditor.focus();
    };

    onAttachmentClick = () => {
        this.refFileInput.click();
    };

    onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            uploadFile(event.target.files[0], this.props.token)
                .then((fileInfo: IApiFileInfo[]) => {
                    getDownloadLink(fileInfo[0].id, this.props.token)
                        .then((link: IApiFileUri) => {
                            const attachments = this.state.attachments.push({name: fileInfo[0].name, link: link.fileUri, ext: fileInfo[0].extension});
                            this.setState((oldState) => ({...oldState, attachments}));
                        });
                })
                .catch(() => {
                    this.props.errorAdd('Error: Upload file');
            });
        }
    };

    send = () => {
        const contentState = this.state.editorState.getCurrentContent();
        const value = JSON.stringify(convertToRaw(contentState));

        this.props.onSend(value, this.state.attachments.toJSON());

        const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''), 'adjust-depth');
        this.setState((oldState) => ({...oldState, editorState}));
    };

    render() {
    return (
        <div>
            <div onClick={this.focus}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    handleKeyCommand={this.handleKeyCommand}
                    plugins={plugins}
                    ref={(element: any) => { this.refEditor = element; }}
                    placeholder="Text message"
                />
                <MentionSuggestions
                    onSearchChange={this.onSearchChange}
                    suggestions={this.state.suggestions}
                />
                <EmojiSuggestions />
            </div>

            <div className="d-flex">
                <EmojiSelect />
                <button title="CTRL + B" onClick={this.onBoldClick}><FontAwesomeIcon icon={['fas', 'bold']} /></button>
                <button title="CTRL + I" onClick={this.onItalicClick}><FontAwesomeIcon icon={['fas', 'italic']} /></button>
                <button title="CTRL + U" onClick={this.onUnderlineClick}><FontAwesomeIcon icon={['fas', 'underline']} /></button>
                <button onClick={this.onStrikeThroughClick}><FontAwesomeIcon icon={['fas', 'strikethrough']} /></button>
                <button title="CTRL + H" onClick={this.onHighlightClick}><FontAwesomeIcon icon={['fas', 'highlighter']} /></button>
                <button onClick={this.onAttachmentClick}><FontAwesomeIcon icon={['fas', 'paperclip']}/></button>
                <input type="file" ref={(input: HTMLInputElement) => this.refFileInput = input} onChange={this.onFileSelect}/>

                {this.props.messageSending ? <BeatLoader color={'#383566'} className={'loader'} /> : ''}

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

            <div>
                {this.state.attachments.map((item) => {
                    return <span key={item.link}>{item.name}</span>;
                })}
            </div>
        </div>
    );
  }
}
