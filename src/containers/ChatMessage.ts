import { connect } from 'react-redux';
import { updateMessage, deleteMessage } from '../actions/messagesActionCreators';
import {Dispatch} from 'redux';
import {ChatMessage, ChatMessageDispatchToProps, ChatMessageStateToProps} from '../components/chat/ChatMessage';
import {IApiMessage} from '../util/apiInterfaces';
import {IState} from '../model/state';

const mapStateToProps = (state: IState) => {
    return {
        messageUpdating: state.app.messageUpdating,
        token: state.user.token,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
      updateMessage: (newMessageData: IApiMessage, messageId: string) => dispatch(updateMessage(newMessageData, messageId)),
      deleteMessage: (id: string) => dispatch(deleteMessage(id))
  };
};

export const ChatMessageContainer = connect<ChatMessageStateToProps, ChatMessageDispatchToProps>(mapStateToProps, mapDispatchToProps)(ChatMessage);
