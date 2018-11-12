import { connect } from 'react-redux';
import { ChatMessages } from "../components/chat/ChatMessages";
import { likeMessage, dislikeMessage, sendMessage } from "../actions/actionCreators";

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLike: (id) => dispatch(likeMessage(id)),
    onDislike: (id) => dispatch(dislikeMessage(id)),
    onSend: (author, text) => dispatch(sendMessage(author, text))
  };
};


export const ChatMessagesContainer = connect(mapStateToProps, mapDispatchToProps)(ChatMessages);
