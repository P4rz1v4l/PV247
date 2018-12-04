import {
    APP_CHANNELS_LOADING,
} from '../constants/appActionsTypes';

export const app = (prevState = {} as any, action: any) => {
    switch (action.type) {
        case APP_CHANNELS_LOADING: {

            return prevState.set('channelLoading', action.payload.channelLoading);
        }

        default:
            return prevState;
    }
};
