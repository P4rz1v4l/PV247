import { connect } from 'react-redux';
import { MenuChannelsList, IMenuChannelsListStateProps, IMenuChannelsListDispatchProps } from '../components/menu/MenuChannelsList';
import {Dispatch} from 'redux';
import {channelsFetch, channelsLoadedUpdate} from '../actions/channelsActionCreator';
import {changeChannel, toggleChannelCreate} from '../actions/appActionCreator';
import {IState} from '../model/state';
import {ChannelRecord, StateChannels} from '../model/stateChannels';
import {Set} from 'immutable';
import memoize = require('memoizee');
import {userChangeChannelsOrder} from '../actions/userActionCreator';

const orderingChannels = (channels: StateChannels, channelsOrder: string[], user: string) => {
    const usersChannels = channels.valueSeq().filter((channel: ChannelRecord) => {
        return channel.customData.users.indexOf(user) > -1;
    }).map((channel: ChannelRecord) => {
            return channel.id;
    });

    const setUsersChannels: Set<any> = Set(usersChannels);
    return Set(channelsOrder).intersect(setUsersChannels).union(setUsersChannels).toArray();
};

const memoizeOrderingChannels = memoize(orderingChannels);

const mapStateToProps = (state: IState) => {
    return {
        channels: state.channels,
        channelLoading: state.app.channelLoading,
        actualChannelId: state.app.actualChannelId,
        actualUser: state.user.email,
        usersOrderedChannels: memoizeOrderingChannels(state.channels, state.user.channelsOrder, state.user.email),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchChannels: () => dispatch(channelsFetch()),
        channelsUpdate: () => dispatch(channelsLoadedUpdate()),
        changeChannel: (channelsId: string) => dispatch(changeChannel(channelsId)),
        toggleChannelCreate: (inCreateChannel: boolean) => dispatch(toggleChannelCreate(inCreateChannel)),
        userChangeChannelsOrder: (orderedChannels: string[]) => dispatch(userChangeChannelsOrder(orderedChannels)),
    };
};

export const MenuChannelsListContainer = connect<IMenuChannelsListStateProps, IMenuChannelsListDispatchProps>(mapStateToProps, mapDispatchToProps)(MenuChannelsList);
