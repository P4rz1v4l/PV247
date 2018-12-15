import { connect } from 'react-redux';
import {Chat, IChatStateToProps} from '../components/chat/Chat';
import {IState} from '../model/state';

const mapStateToProps = (state: IState) => {
    return {
        inCreateChannel: state.app.inCreateChannel,
        actualChannelId: state.app.actualChannelId,
    };
};

export const ChatContainer = connect<IChatStateToProps>(mapStateToProps)(Chat);
