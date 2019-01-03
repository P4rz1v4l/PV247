import { connect } from 'react-redux';
import {sendMessage} from '../actions/messagesActionCreators';
import {Dispatch} from 'redux';
import {ChatInput, IChatInputDispatchToProps, IChatInputStateToProps} from '../components/chat/ChatInput';
import {IState} from '../model/state';
import {IMessageCustomDataAttachments} from '../model/stateMessages';

const mapStateToProps = (state: IState) => {
    return {
        messageSending: state.app.messageSending,
        mentions: state.channels.getIn([state.app.actualChannelId, 'customData', 'users']).map((email: string) => ({name: email})),
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
      onSend: (value: string, attachments: IMessageCustomDataAttachments[]) => dispatch(sendMessage(value, attachments)),
  };
};

export const ChatInputContainer = connect<IChatInputStateToProps, IChatInputDispatchToProps>(mapStateToProps, mapDispatchToProps)(ChatInput);
