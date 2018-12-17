import {
    CHANNEL_UPDATE_SUCCESS,
    CHANNEL_CREATE_SUCCESS,
    CHANNELS_FETCH_SUCCESS,
    CHANNELS_UPDATE_SUCCESS,
} from '../constants/channelsActionsTypes';
import { Dispatch } from 'redux';
import {changeChannel, creatingChannel, loadingChannels, updatingChannel} from './appActionCreator';
import {fetchChannelsInfo} from '../util/fetchChannelsInfo';
import {fetchChannelCreate} from '../util/fetchChannelCreate';
import {IChannel} from '../model/stateChannels';
import {IState} from '../model/state';
import {fetchChannelUpdate} from '../util/fetchChannelUpdate';
import {fetchChannelInfo} from '../util/fetchChannelInfo';
import {fetchChannelDelete} from '../util/fetchChannelDelete';

const channelsFetchSuccess = (channels: Array<IChannel>): any => ({
    type: CHANNELS_FETCH_SUCCESS,
    payload: {
        channels,
    }
});

export const channelsFetch = (): any  => {
    return (dispatch: Dispatch, getState: () => IState ) => {
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

export const channelsLoadedUpdate = (): any  => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        fetchChannelsInfo(getState().user.token)
            .then((data: Array<IChannel>) => {
                dispatch(channelsLoadedUpdateSuccess(data));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};


const channelsLoadedUpdateSuccess = (channels: Array<IChannel>): any => ({
    type: CHANNELS_UPDATE_SUCCESS,
    payload: {
        channels
    }
});

const channelCreateSuccess = (channel: IChannel): any => ({
    type: CHANNEL_CREATE_SUCCESS,
    payload: {
        channel
    }
});

export const channelCreate = (name: string, description: string): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        dispatch(creatingChannel(true));


        fetchChannelCreate(name, {owner: getState().user.email, description, users: [getState().user.email], timestamp: new Date().getTime().toString()}, getState().user.token)
            .then((channelData: IChannel) => {
                dispatch(channelCreateSuccess(channelData));
                dispatch(creatingChannel(false));
                dispatch(changeChannel(channelData.id));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const channelDelete = (channelId: string): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        dispatch(changeChannel(''));

        fetchChannelDelete(channelId, getState().user.token)
            .catch((error) => {
                console.log(error);
            });

        dispatch(channelsLoadedUpdate());
    };
};

const channelUpdateSuccess = (channel: IChannel): any => ({
    type: CHANNEL_UPDATE_SUCCESS,
    payload: {
        channel
    }
});

export const channelUpdate = (channelData: IChannel): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        dispatch(updatingChannel(true));


        fetchChannelUpdate(channelData, getState().user.token)
            .then((data: IChannel) => {
                dispatch(channelUpdateSuccess(data));
                dispatch(updatingChannel(false));
            })
            .catch((error) => {
                console.log(error);
                dispatch(updatingChannel(false));
            });
    };
};

export const channelLeave = (channelId: string): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        dispatch(changeChannel(''));

        fetchChannelInfo(channelId, getState().user.token)
            .then((channelData: IChannel) => {
                const indexChannel: number = channelData.customData.users.indexOf(getState().user.email);
                if ( indexChannel > -1 ) {
                    channelData.customData.users.splice(indexChannel, 1);

                    fetchChannelUpdate(channelData, getState().user.token)
                        .then((newChannelData: IChannel) => {
                            dispatch(channelUpdateSuccess(newChannelData));
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const channelInvite = (email: string): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        fetchChannelInfo(getState().app.actualChannelId, getState().user.token)
            .then((channelData: IChannel) => {
                if ( channelData.customData.users.indexOf(getState().user.email) === -1 ) {
                    channelData.customData.users.push(email);

                    fetchChannelUpdate(channelData, getState().user.token)
                        .then((newChannelData: IChannel) => {
                            dispatch(channelUpdateSuccess(newChannelData));
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
