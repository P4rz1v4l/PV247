import {
    APP_CHANNELS_LOADING,
    APP_USER_LOGINNING,
} from '../constants/appActionsTypes';

export const app = (prevState: any, action: any) => {
    switch (action.type) {
        case APP_CHANNELS_LOADING: {
            return prevState.set('channelLoading', action.payload.channelLoading);
        }

        case APP_USER_LOGINNING: {
            return prevState.set('userLoginProcess', action.payload.userLoginning);
        }

        default:
            return prevState;
    }
};
