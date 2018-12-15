import {
    CHANNELS_CREATE_SUCCESS,
    CHANNELS_FETCH_SUCCESS,
} from '../constants/channelsActionsTypes';
import { Dispatch } from 'redux';
import {changeChannel, creatingChannel, loadingChannels} from './appActionCreator';
import {fetchChannelsInfo} from '../util/fetchChannelsInfo';
import {fetchChannelCreate} from '../util/fetchChannelCreate';
import {IChannel} from '../model/stateChannels';
import {IState} from '../model/state';

const channelsFetchSuccess = (data: Array<IChannel>): any => ({
    type: CHANNELS_FETCH_SUCCESS,
    payload: {
        channels: data
    }
});

export const channelsFetch = (): any  => {
    return (dispatch: Dispatch, getState: () => any ) => {
        dispatch(loadingChannels(true));


        fetchChannelsInfo(getState().user.token)
            .then((data: Array<IChannel>) => {
                dispatch(channelsFetchSuccess(data));
                dispatch(loadingChannels(false));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};


const channelCreateSuccess = (channel: IChannel): any => ({
    type: CHANNELS_CREATE_SUCCESS,
    payload: {
        channel
    }
});

export const channelCreate = (name: string, description: string): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        dispatch(creatingChannel(true));


        fetchChannelCreate(name, {owner: getState().user.email, description, users: [getState().user.email]}, getState().user.token)
            .then((data: IChannel) => {
                dispatch(channelCreateSuccess(data));
                dispatch(creatingChannel(false));
                dispatch(changeChannel(data.id));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
