import { connect } from 'react-redux';
import { ChatMessages, IChatMessagesStateProps, IChatMessagesDispatchProps } from '../components/chat/ChatMessages';
import { likeMessage, dislikeMessage, sendMessage, deleteMessage } from '../actions/messagesActionCreators';
import {Dispatch} from 'redux';

const mapStateToProps = (state: any) => {
    return {
        messages: state.get('messages'),
        user: state.get('user')
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
      onLike: (id: string) => dispatch(likeMessage(id)),
      onDislike: (id: string) => dispatch(dislikeMessage(id)),
      onSend: (author: string, text: string) => dispatch(sendMessage(author, text)),
      onDeleteMessage: (id: string) => dispatch(deleteMessage(id))
  };
};


export const ChatMessagesContainer = connect<IChatMessagesStateProps, IChatMessagesDispatchProps>(mapStateToProps, mapDispatchToProps)(ChatMessages);
