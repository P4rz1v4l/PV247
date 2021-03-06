import {
    APP_USER_LOGINNING,
    APP_CHANNELS_LOADING,
    APP_CHANNEL_CHANGE,
    APP_TOGGLE_CHANNEL_CREATE,
    APP_CHANNEL_CREATING,
    APP_USER_CHANGING_NAME,
    APP_MESSAGES_LOADING,
    APP_MESSAGE_SENDING,
    APP_MESSAGE_UPDATING, APP_CHANNEL_UPDATING, APP_USER_CHANGING_AVATAR, STATE_DATA_CLEAR,
} from '../constants/appActionsTypes';
import {Dispatch} from 'redux';
import {IState} from '../model/state';
import {fetchMessagesInfo} from '../util/fetchMessagesInfo';
import {loadMessagesSuccess} from './messagesActionCreators';
import {fetchChannelInfo} from '../util/fetchChannelInfo';
import {errorAdd} from './errorsActionCreators';

export const stateClear = (): any => ({
    type: STATE_DATA_CLEAR,
});

export const toggleChannelCreate = (inCreateChannel: boolean): any => ({
    type: APP_TOGGLE_CHANNEL_CREATE,
    payload: {
        inCreateChannel
    }
});

export const loadingChannels = (channelLoading: boolean): any => ({
    type: APP_CHANNELS_LOADING,
    payload: {
        channelLoading
    }
});

export const loginningUser = (userLoginning: boolean): any => ({
    type: APP_USER_LOGINNING,
    payload: {
        userLoginning
    }
});

export const changingNameUser = (userChangingName: boolean): any => ({
    type: APP_USER_CHANGING_NAME,
    payload: {
        userChangingName
    }
});

export const changingAvatarUser = (userChangingAvatar: boolean): any => ({
    type: APP_USER_CHANGING_AVATAR,
    payload: {
        userChangingAvatar
    }
});

export const creatingChannel = (channelCreating: boolean): any => ({
    type: APP_CHANNEL_CREATING,
    payload: {
        channelCreating
    }
});

export const updatingChannel = (channelUpdating: boolean): any => ({
    type: APP_CHANNEL_UPDATING,
    payload: {
        channelUpdating
    }
});

export const changedChannel = (channelsId: string): any => ({
    type: APP_CHANNEL_CHANGE,
    payload: {
        channelsId
    }
});

export const changeChannel = (channelsId: string): any => {
    return (dispatch: Dispatch, getState: () => IState) => {
        if (channelsId !== '') {
            return fetchChannelInfo(channelsId, getState().user.token)
                .then(() => {
                    dispatch(changedChannel(channelsId));
                    dispatch(loadingMessages(true));

                    return fetchMessagesInfo(channelsId, getState().user.token)
                        .then((messages) => {
                            dispatch(loadMessagesSuccess(messages));
                            dispatch(loadingMessages(false));
                        })
                        .catch(() => {
                            dispatch(errorAdd('Error: load messages'));
                            dispatch(loadingMessages(false));
                        });
                })
                .catch(() => {
                    dispatch(errorAdd('Error: change channel'));
                });
        }
        else {
            dispatch(changedChannel(channelsId));
            return null;
        }
    };
};

export const loadingMessages = (messagesLoading: boolean): any => ({
    type: APP_MESSAGES_LOADING,
    payload: {
        messagesLoading
    }
});

export const sendingMessage = (messageSending: boolean): any => ({
    type: APP_MESSAGE_SENDING,
    payload: {
        messageSending
    }
});

export const updatingMessage = (messageUpdating: boolean): any => ({
    type: APP_MESSAGE_UPDATING,
    payload: {
        messageUpdating
    }
});
