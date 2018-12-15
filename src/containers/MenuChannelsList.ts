import { connect } from 'react-redux';
import { MenuChannelsList, IMenuChannelsListStateProps, IMenuChannelsListDispatchProps } from '../components/menu/MenuChannelsList';
import {Dispatch} from 'redux';
import { channelsFetch } from '../actions/channelsActionCreator';
import {changeChannel, toggleChannelCreate} from '../actions/appActionCreator';
import {IState} from '../model/state';

const mapStateToProps = (state: IState) => {
    return {
        channels: state.channels,
        channelLoading: state.app.channelLoading,
        actualChannelId: state.app.actualChannelId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchChannels: () => dispatch(channelsFetch()),
        changeChannel: (channelsId: string) => dispatch(changeChannel(channelsId)),
        toggleChannelCreate: (inCreateChannel: boolean) => dispatch(toggleChannelCreate(inCreateChannel)),
    };
};

export const MenuChannelsListContainer = connect<IMenuChannelsListStateProps, IMenuChannelsListDispatchProps>(mapStateToProps, mapDispatchToProps)(MenuChannelsList);
