import {IState} from '../model/state';
import {ChannelRecord, IChannel} from '../model/stateChannels';
import {Dispatch} from 'redux';
import {channelDelete, channelLeave, channelUpdate} from '../actions/channelsActionCreator';
import {connect} from 'react-redux';
import {ChatInfoSettings, IChatInfoSettingsDispatchToProps, IChatInfoSettingsStateToProps} from '../components/chat/ChatInfoSettings';

const mapStateToProps = (state: IState) => {
    return {
        channel: state.channels.get(state.app.actualChannelId as string) as ChannelRecord,
        actualUserId: state.user.email,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        channelUpdate: (channel: IChannel) => dispatch(channelUpdate(channel)),
        channelDelete: (channelId: string) => dispatch(channelDelete(channelId)),
        leaveUser: (channelId: string) => dispatch(channelLeave(channelId)),
    };
};

export const ChatInfoSettingsContainer = connect<IChatInfoSettingsStateToProps, IChatInfoSettingsDispatchToProps>(mapStateToProps, mapDispatchToProps)(ChatInfoSettings);
