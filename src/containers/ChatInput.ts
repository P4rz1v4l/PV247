import { connect } from 'react-redux';
import {sendMessage} from '../actions/messagesActionCreators';
import {Dispatch} from 'redux';
import {ChatInput, IChatInputDispatchToProps, IChatInputStateToProps} from '../components/chat/ChatInput';
import {IState} from '../model/state';

const mapStateToProps = (state: IState) => {
    return {
        messageSending: state.app.messageSending,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
      onSend: (value: string) => dispatch(sendMessage(value)),
  };
};

export const ChatInputContainer = connect<IChatInputStateToProps, IChatInputDispatchToProps>(mapStateToProps, mapDispatchToProps)(ChatInput);
