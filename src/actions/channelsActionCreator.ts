import {
    CHANNELS_FETCH_SUCCESS,
} from '../constants/channelsActionsTypes';
import { Dispatch } from 'redux';
import { loadingChannels } from './appActionCreator';
import {fetchChannelInfo} from '../util/fetchChannelInfo';



export const channelsFetchSuccess = (data: Array<{id: string; name: string; customData: any}>): any => ({
    type: CHANNELS_FETCH_SUCCESS,
    payload: {
        channels: data
    }
});

export function fetchChannels(): any {
    return (dispatch: Dispatch, getState: () => any ) => {
        dispatch(loadingChannels(true));


        fetchChannelInfo(getState().getIn(['user', 'token']))
            .then((data) => {
                dispatch(channelsFetchSuccess(data));
                dispatch(loadingChannels(false));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}
