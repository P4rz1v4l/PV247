import { connect } from 'react-redux';
import {sendMessage} from '../actions/messagesActionCreators';
import {Dispatch} from 'redux';
import {ChatInput, IChatInputDispatchToProps, IChatInputStateToProps} from '../components/chat/ChatInput';
import {IState} from '../model/state';
import {IMessageCustomDataAttachments} from '../model/stateMessages';
import {errorAdd} from '../actions/errorsActionCreators';

const mapStateToProps = (state: IState) => {
    return {
        messageSending: state.app.messageSending,
        mentions: state.channels.getIn([state.app.actualChannelId, 'customData', 'users']).map((email: string) => ({name: email})),
        token: state.user.token,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
      onSend: (value: string, attachments: IMessageCustomDataAttachments[]) => dispatch(sendMessage(value, attachments)),
      errorAdd: (text: string) => dispatch(errorAdd(text)),
  };
};

export const ChatInputContainer = connect<IChatInputStateToProps, IChatInputDispatchToProps>(mapStateToProps, mapDispatchToProps)(ChatInput);
