import {IState} from '../model/state';
import {connect} from 'react-redux';
import {ChatInfoUsers, IChatInfosUsersStateToProps} from '../components/chat/ChatInfoUsers';

const mapStateToProps = (state: IState) => {
    return {
        users: state.channels.getIn([state.app.actualChannelId, 'customData', 'users'])
    };
};

export const ChatInfoUserContainer = connect<IChatInfosUsersStateToProps>(mapStateToProps)(ChatInfoUsers);
