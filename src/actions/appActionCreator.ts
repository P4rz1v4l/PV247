import {
    APP_USER_LOGINNING,
    APP_CHANNELS_LOADING
} from '../constants/appActionsTypes';


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
