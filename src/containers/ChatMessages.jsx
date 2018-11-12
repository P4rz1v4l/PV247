import { connect } from 'react-redux';
import { ChatMessages } from "../components/chat/ChatMessages";
import { likeMessage, dislikeMessage } from "../actions/actionCreators";

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLike: (id) => dispatch(likeMessage(id)),
    onDislike: (id) => dispatch(dislikeMessage(id))
  };
};


export const ChatMessagesContainer = connect(mapStateToProps, mapDispatchToProps)(ChatMessages);
