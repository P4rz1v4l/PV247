import { connect } from 'react-redux';
import { ChatMessages } from "../components/chat/ChatMessages";

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export const ChatMessagesContainer = connect(mapStateToProps)(ChatMessages);
