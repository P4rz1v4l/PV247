import {connect} from 'react-redux';
import {ChatMessages, IChatMessagesDispatchToProps, IChatMessagesStateToProps} from '../components/chat/ChatMessages';
import {IState} from '../model/state';
import {Dispatch} from 'redux';
import {updateLoadedMessages} from '../actions/messagesActionCreators';

const mapStateToProps = (state: IState) => {
    return {
        messages: state.messages,
        messagesLoading: state.app.messagesLoading,
        actualUser: state.user.email,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateLoadedMessages: () => dispatch(updateLoadedMessages()),
    };
};

export const ChatMessagesContainer = connect<IChatMessagesStateToProps, IChatMessagesDispatchToProps>(mapStateToProps, mapDispatchToProps)(ChatMessages);
