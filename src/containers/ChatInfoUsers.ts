import {IState} from '../model/state';
import {connect} from 'react-redux';
import {ChatInfoUsers, IChatInfosUsersStateToProps, IChatInfoUsersDispatchToProps} from '../components/chat/ChatInfoUsers';
import {Dispatch} from 'redux';
import {channelInvite} from '../actions/channelsActionCreator';

const mapStateToProps = (state: IState) => {
    return {
        users: state.channels.getIn([state.app.actualChannelId, 'customData', 'users'])
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        inviteUser: (email: string) => dispatch(channelInvite(email)),
    };
};

export const ChatInfoUserContainer = connect<IChatInfosUsersStateToProps, IChatInfoUsersDispatchToProps>(mapStateToProps, mapDispatchToProps)(ChatInfoUsers);
