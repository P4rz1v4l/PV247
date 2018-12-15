import {
    APP_CHANNELS_LOADING,
    APP_USER_LOGINNING,
    APP_CHANNEL_CHANGE,
    APP_TOGGLE_CHANNEL_CREATE,
    APP_CHANNEL_CREATING, APP_USER_CHANGING_NAME, APP_MESSAGES_LOADING, APP_MESSAGE_SENDING, APP_MESSAGE_UPDATING,
} from '../constants/appActionsTypes';
import {StateAppRecord} from '../model/stateApp';

export const app = (prevState = new StateAppRecord() as StateAppRecord, action: any) => {
    switch (action.type) {
        case APP_TOGGLE_CHANNEL_CREATE: {
            return prevState.set('inCreateChannel', action.payload.inCreateChannel);
        }

        case APP_CHANNELS_LOADING: {
            return prevState.set('channelLoading', action.payload.channelLoading);
        }

        case APP_CHANNEL_CREATING: {
            return prevState.set('channelCreating', action.payload.channelCreating);
        }

        case APP_CHANNEL_CHANGE: {
            return prevState.merge({actualChannelId: action.payload.channelsId, inCreateChannel: false});
        }

        case APP_USER_LOGINNING: {
            return prevState.set('userLoginProcess', action.payload.userLoginning);
        }

        case APP_USER_CHANGING_NAME: {
            return prevState.set('userChangingName', action.payload.userChangingName);
        }

        case APP_MESSAGES_LOADING: {
            return prevState.set('messagesLoading', action.payload.messagesLoading);
        }

        case APP_MESSAGE_SENDING: {
            return prevState.set('messageSending', action.payload.messageSending);
        }

        case APP_MESSAGE_UPDATING: {
            return prevState.set('messageUpdating', action.payload.messageUpdating);
        }

        default:
            return prevState;
    }
};
