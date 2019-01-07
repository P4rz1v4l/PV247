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
import {errorAdd} from './errorsActionCreators';
import {ApiError} from '../model/apiError';

const channelsFetchSuccess = (channels: Array<IChannel>): any => ({
    type: CHANNELS_FETCH_SUCCESS,
    payload: {
        channels,
    }
});

export const channelsFetch = (): any  => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        dispatch(loadingChannels(true));

        return fetchChannelsInfo(getState().user.token)
            .then((data: Array<IChannel>) => {
                dispatch(channelsFetchSuccess(data));
                dispatch(loadingChannels(false));
            })
            .catch(() => {
                dispatch(errorAdd('Error: load channel'));
            });
    };
};

export const channelsLoadedUpdate = (): any  => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        return fetchChannelsInfo(getState().user.token)
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

        return fetchChannelCreate(name, {owner: getState().user.email, description, users: [getState().user.email], timestamp: new Date().getTime().toString()}, getState().user.token)
            .then((channelData: IChannel) => {
                dispatch(channelCreateSuccess(channelData));
                dispatch(creatingChannel(false));
                dispatch(changeChannel(channelData.id));
            })
            .catch(() => {
                dispatch(errorAdd('Error: Create channel'));
                dispatch(creatingChannel(false));
            });
    };
};

export const channelDelete = (channelId: string): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        dispatch(changeChannel(''));

        fetchChannelDelete(channelId, getState().user.token)
            .catch((error: ApiError) => {
                if ('code' in error) {
                    dispatch(errorAdd('Error: Delete channel'));
                }
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


        return fetchChannelUpdate(channelData, getState().user.token)
            .then((data: IChannel) => {
                dispatch(channelUpdateSuccess(data));
                dispatch(updatingChannel(false));
            })
            .catch(() => {
                dispatch(errorAdd('Error: Update channel'));
                dispatch(updatingChannel(false));
            });
    };
};

export const channelLeave = (channelId: string): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        dispatch(changeChannel(''));

        return fetchChannelInfo(channelId, getState().user.token)
            .then((channelData: IChannel) => {
                const indexChannel: number = channelData.customData.users.indexOf(getState().user.email);
                if ( indexChannel > -1 ) {
                    channelData.customData.users.splice(indexChannel, 1);

                    return fetchChannelUpdate(channelData, getState().user.token)
                        .then((newChannelData: IChannel) => {
                            dispatch(channelUpdateSuccess(newChannelData));
                        });
                }
                else {
                    return;
                }
            })
            .catch(() => {
                dispatch(errorAdd('Error: Leave channel'));
            });
    };
};

export const channelInvite = (email: string): any => {
    return (dispatch: Dispatch, getState: () => IState ) => {
        return fetchChannelInfo(getState().app.actualChannelId, getState().user.token)
            .then((channelData: IChannel) => {
                if ( channelData.customData.users.indexOf(email) === -1 ) {
                    channelData.customData.users.push(email);

                    return fetchChannelUpdate(channelData, getState().user.token)
                        .then((newChannelData: IChannel) => {
                            dispatch(channelUpdateSuccess(newChannelData));
                        });
                }
                else {
                    return;
                }
            })
            .catch(() => {
                dispatch(errorAdd('Error: Invite channel'));
            });
    };
};
