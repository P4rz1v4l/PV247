import { connect } from 'react-redux';
import {IChatHeaderStateToProps, ChatHeader} from '../components/chat/ChatHeader';
import {IState} from '../model/state';

const mapStateToProps = (state: IState) => {
    return {
        chatName: state.channels.getIn([state.app.actualChannelId, 'name']),
        chatDesc: state.channels.getIn([state.app.actualChannelId, 'customData', 'description']),
    };
};

export const ChatHeaderContainer = connect<IChatHeaderStateToProps>(mapStateToProps)(ChatHeader);
